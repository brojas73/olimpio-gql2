import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { FaPhoneAlt, FaTicketAlt, FaUserAlt } from 'react-icons/fa'

import { useQuery, useMutation } from 'react-query'
import { actualizaInfoPago } from "../../../mutations/ServicioDomicilio"
import { useAuth } from '../../../hooks/useAuth'
import { fetchServicioDomicilio, QUERY_SERVICIO_DOMICILIO } from '../../../queries/ServicioDomicilio'

import FormasPagoSelect from '../../comun/FormaPagoSelect'
import { isBlank, pagado, esEntrega } from '../../comun/utils'

const InformacionPagoForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const idServicioDomicilio = location.state.id_servicio_domicilio
    const { credenciales } = useAuth()
    const [formaPagoInfo, setFormaPagoInfo] = useState({
        id_forma_pago: 0,
        notas_pago: '',
        confirmar_pago: false,
        referencia_pago: ''
    })
    const [errors, setErrors] = useState({})

    const { mutate: doActualizaInfoPago } = useMutation ({
        mutationFn: actualizaInfoPago,
    })
    
    const { data, isLoading } = useQuery(
        [QUERY_SERVICIO_DOMICILIO, idServicioDomicilio], 
        fetchServicioDomicilio, 
        {
            onSuccess: (data) => {
                const servicioDomicilio = data[0]
                setFormaPagoInfo(prevValue => ({...prevValue, 
                    id_forma_pago: servicioDomicilio.id_forma_pago ? servicioDomicilio.id_forma_pago : 0,
                    notas_pago: servicioDomicilio.notas_pago ? servicioDomicilio.notas_pago : '',
                    confirmar_pago: pagado(servicioDomicilio),
                    referencia_pago: servicioDomicilio.referencia_pago ? servicioDomicilio.referencia_pago : ''
                }))
            }
        }
    )

    function handleSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            doActualizaInfoPago({id_servicio_domicilio: idServicioDomicilio, id_usuario: credenciales.id_usuario, infoPago: formaPagoInfo})
            navigate(-1)
        }
    }

    function handleChange(e) {
        if (e.target.name === 'confirmar_pago') {
            setFormaPagoInfo(prevValue => ({...prevValue, confirmar_pago: e.target.checked}))
        } else {
            setFormaPagoInfo(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))
        }

        // Si hay errores, los quito de la forma
        if (!!errors[[e.target.name]]) {
            setErrors({...errors, [e.target.name]: null})
        }
    }

    function handleCancelar() {
        navigate(-1)
    }

    function findFormErrors() {
        const { id_forma_pago, confirmar_pago, referencia_pago } = formaPagoInfo
        const newErrors = {}
    
        if (id_forma_pago === 0) newErrors.id_forma_pago = 'Selecciona una forma de pago'
        if (confirmar_pago) {
            if (!referencia_pago || isBlank(referencia_pago)) newErrors.referencia_pago = 'Captura una referencia del pago'
        }

        return newErrors
    }

    function isValid() {
        const newErrors = findFormErrors()
    
        // Si hubo errores
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return false
        }
    
        return true
    }
    
    if (isLoading) return <Spinner animation="border" />

    const servicioDomicilio = data[0]
    
    return (
        <>
            <Button variant="dark" size="md">
                Información de Pago
            </Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    {
                        esEntrega(servicioDomicilio) && (
                            <Card.Text className="mb-0"><FaTicketAlt /> {servicioDomicilio.ticket.padStart(6, '0')}</Card.Text>
                        )
                    }
                    <Card.Text className="mb-0">
                        <FaUserAlt /> {servicioDomicilio.nombre} 
                    </Card.Text>
                    <Card.Text className="mb-0">
                        <FontAwesomeIcon icon={faHouse} /> {servicioDomicilio.direccion}
                    </Card.Text>
                    {
                        servicioDomicilio.colonia && (
                            <Card.Text className="mb-0 ms-4"> COL. {servicioDomicilio.colonia}</Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.municipio && (
                            <Card.Text className="mb-0 ms-4">DEL. {servicioDomicilio.municipio}</Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.cp && (
                            <Card.Text className="mb-0 ms-4">C.P. {servicioDomicilio.cp}</Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.ubicacion && (
                            <Card.Text className="mb-0">
                                <FontAwesomeIcon icon={faLocationDot} /> {servicioDomicilio.ubicacion}
                            </Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.ubicacion && (
                            <Card.Text className="mb-0">
                                <FontAwesomeIcon icon={faLocationDot} /> 
                                {servicioDomicilio.ubicacion}
                            </Card.Text>
                        )
                    }
                    <Card.Text className="mb-0">
                        <FaPhoneAlt /> {servicioDomicilio.telefono}
                    </Card.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FormasPagoSelect 
                        disabled={pagado(servicioDomicilio)}
                        label='Forma de Pago'
                        onChange={handleChange} 
                        value={formaPagoInfo.id_forma_pago}
                        name='id_forma_pago' 
                        isInvalid={ !!errors.id_forma_pago }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.id_forma_pago }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Notas</Form.Label>
                    <Form.Control 
                        as='textarea'
                        disabled={pagado(servicioDomicilio)}
                        rows={2}
                        onChange={handleChange} 
                        value={formaPagoInfo.notas_pago}
                        name='notas_pago' 
                        placeholder='Captura una nota sobre la forma de pago...'
                        isInvalid={ !!errors.notas_pago }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.notas_pago }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check
                        label="Confirmar Pago" 
                        disabled={pagado(servicioDomicilio)}
                        type='checkbox'
                        onChange={handleChange} 
                        checked={formaPagoInfo.confirmar_pago}
                        name='confirmar_pago' 
                    />
                </Form.Group>
                {
                    formaPagoInfo.confirmar_pago && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Referencia del Pago</Form.Label>
                                <Form.Control 
                                    as='textarea'
                                    disabled={pagado(servicioDomicilio)}
                                    rows={2}
                                    onChange={handleChange} 
                                    value={formaPagoInfo.referencia_pago}
                                    name='referencia_pago' 
                                    placeholder='Captura la referencia del pago...'
                                    isInvalid={ !!errors.referencia_pago }
                                />
                                <Form.Control.Feedback type='invalid'>
                                    { errors.referencia_pago }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </>
                    )
                }
                {
                    pagado(servicioDomicilio) && (
                        <Form.Group className="mb-3">
                            <Form.Label>Confirmó el Pago: { servicioDomicilio.confirmo_pago } </Form.Label>
                        </Form.Group>
                    )
                }
                <Button variant="secondary" onClick={handleCancelar}>
                    {pagado(servicioDomicilio) ? 'Regresar' : 'Cancelar'} 
                </Button><span> </span>
                {
                    !pagado(servicioDomicilio) && (
                        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
                    )
                }
            </Form>
        </>
    )
}

export default InformacionPagoForm
