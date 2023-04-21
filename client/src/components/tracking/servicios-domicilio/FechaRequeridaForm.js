import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { FaPhoneAlt, FaTicketAlt, FaUserAlt } from 'react-icons/fa'

import { useAuth } from '../../../hooks/useAuth'

import { useQuery, useMutation } from 'react-query'
import { actualizaFechaRequerida } from "../../../mutations/ServicioDomicilio"
import { fetchServicioDomicilio, QUERY_SERVICIO_DOMICILIO } from '../../../queries/ServicioDomicilio'

import { isBlank, pagado, esEntrega, formateaFechaForm, TAMANO_CONTROLES, FONT_SIZE_DROPDOWN } from '../../comun/utils'

const FechaRequeridaForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const idServicioDomicilio = location.state.id_servicio_domicilio
    const { credenciales } = useAuth()
    const [formaFechaRequerida, setFormaFechaRequerida] = useState({
        fecha_requerida: '',
        hora_requerida: ''
    })
    const [errors, setErrors] = useState({})

    const { mutate: doActualizaFechaRequerida } = useMutation ({
        mutationFn: actualizaFechaRequerida,
    })
    
    const { data, isLoading } = useQuery(
        [QUERY_SERVICIO_DOMICILIO, idServicioDomicilio], 
        fetchServicioDomicilio, 
        {
            onSuccess: (data) => {
                const servicioDomicilio = data[0]
                setFormaFechaRequerida(prevValue => ({...prevValue, 
                    fecha_requerida: servicioDomicilio.fecha_requerida.substring(0, 10),
                    hora_requerida: servicioDomicilio.hora_requerida
                }))
            }
        }
    )

    function handleSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            doActualizaFechaRequerida({id_servicio_domicilio: idServicioDomicilio, id_usuario: credenciales.id_usuario, fechaRequerida: formaFechaRequerida})
            navigate(-1)
        }
    }

    function handleChange(e) {
        setFormaFechaRequerida(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))

        // Si hay errores, los quito de la forma
        if (!!errors[[e.target.name]]) {
            setErrors({...errors, [e.target.name]: null})
        }
    }

    function handleCancelar() {
        navigate(-1)
    }

    function findFormErrors() {
        const { 
            fecha_requerida, 
            hora_requerida,
        } = servicioDomicilio
        const newErrors = {}
    
        if (!fecha_requerida || isBlank(fecha_requerida)) newErrors.fecha_requerida = 'Captura la fecha requerida'
        if (!hora_requerida || isBlank(hora_requerida)) newErrors.hora_requerida = 'Captura la hora requerida'
    
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
            <Button variant="dark" size={TAMANO_CONTROLES}>
                Cambio de la Fecha Requerida
            </Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2" style={{ fontSize: `${FONT_SIZE_DROPDOWN}`}}>
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
                <Row>
                    <Form.Group as={Col} className="mb-2">
                        <Form.Label column={TAMANO_CONTROLES}>Fecha Requerida</Form.Label>
                        <Form.Control 
                            size={TAMANO_CONTROLES}
                            type='date'
                            onChange={handleChange}
                            value={formaFechaRequerida.fecha_requerida.substring(0, 10)}
                            name='fecha_requerida' 
                            min={formateaFechaForm(Date())}
                            isInvalid={ !!errors.fecha_rquerida }
                        />                    
                        <Form.Control.Feedback type='invalid'>
                            { errors.fecha_requerida }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2">
                        <Form.Label column={TAMANO_CONTROLES}>Hora Requerida</Form.Label>
                        <Form.Control
                            size={TAMANO_CONTROLES}
                            type='time'
                            onChange={handleChange}
                            value={formaFechaRequerida.hora_requerida}
                            name='hora_requerida' 
                            isInvalid={ !!errors.hora_rquerida }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.hora_requerida }
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button variant="secondary" onClick={handleCancelar} size={TAMANO_CONTROLES}>
                    {pagado(servicioDomicilio) ? 'Regresar' : 'Cancelar'} 
                </Button><span> </span>
                {
                    !pagado(servicioDomicilio) && (
                        <Button variant="primary" onClick={handleSubmit} size={TAMANO_CONTROLES}>Guardar</Button>
                    )
                }
            </Form>
        </>
    )
}

export default FechaRequeridaForm
