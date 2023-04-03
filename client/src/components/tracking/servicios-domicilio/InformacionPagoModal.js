import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

import { Button, Card, Form, Modal, Spinner } from 'react-bootstrap'
import { FaPhoneAlt, FaUserAlt } from 'react-icons/fa'

import { useQuery } from 'react-query'
import { useAuth } from '../../../hooks/useAuth'
import { fetchServicioDomicilio, QUERY_SERVICIO_DOMICILIO } from '../../../queries/ServicioDomicilio'

import FormasPagoSelect from '../../comun/FormaPagoSelect'
import { isBlank, pagado } from '../../comun/utils'

const InformacionPagoModal = ({mostrar, onConfirmar, idServicioDomicilio}) => {
    const { credenciales } = useAuth()
    const [formaPagoInfo, setFormaPagoInfo] = useState({
        id_forma_pago: 0,
        notas_pago: '',
        confirmar_pago: false,
        referencia_pago: '',
        id_usuario: credenciales.id_usuario
    })
    const [errors, setErrors] = useState({})
    
    const { data, isLoading } = useQuery(QUERY_SERVICIO_DOMICILIO, () => fetchServicioDomicilio(idServicioDomicilio), {
        onSuccess: (data) => {
            const servicioDomicilio = data[0]
            setFormaPagoInfo(prevValue => ({...prevValue, 
                id_forma_pago: servicioDomicilio.id_forma_pago ? servicioDomicilio.id_forma_pago : 0,
                notas_pago: servicioDomicilio.notas_pago ? servicioDomicilio.notas_pago : '',
                confirmar_pago: pagado(servicioDomicilio),
                referencia_pago: servicioDomicilio.referencia_pago ? servicioDomicilio.referencia_pago : ''
            }))
        }
    })

    function handleSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            onConfirmar(true, formaPagoInfo)            
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

    function findFormErrors() {
        const { id_forma_pago, confirmar_pago, referencia_pago } = formaPagoInfo
        const newErrors = {}
    
        if (id_forma_pago === 0) newErrors.id_forma_pago = 'Selecciona una forma de pago'
        if (confirmar_pago) {
            if (!referencia_pago || isBlank(referencia_pago)) newErrors.referencia_pago = 'Captura una ferencia del pago'
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

    // Obtengo el primer elemento del resultado
    const servicioDomicilio = data[0]
  
    return (
        <Modal show={mostrar} onHide={() => onConfirmar(false)}>
            <Modal.Header>
                <Modal.Title>Informción del Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Card.Text className="mb-0">
                            <FaUserAlt /> {servicioDomicilio.nombre} 
                        </Card.Text>
                        <Card.Text className="mb-0">
                            <FontAwesomeIcon icon={faLocationDot} /> {servicioDomicilio.direccion}
                        </Card.Text>
                        <Card.Text className="mb-0">
                            <FaPhoneAlt /> {servicioDomicilio.telefono}
                        </Card.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FormasPagoSelect 
                            disabled={(pagado(servicioDomicilio)).toString()}
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
                            disabled={(pagado(servicioDomicilio)).toString()}
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
                            disabled={(pagado(servicioDomicilio)).toString()}
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
                                    disabled={(pagado(servicioDomicilio)).toString()}
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
                            <Form.Control.Feedback type='invalid'>
                                { errors.notas_pago }
                            </Form.Control.Feedback>
                            </>
                    )
                    }
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onConfirmar(false)}>Cerrar</Button>
                    {
                        !pagado(servicioDomicilio) && (
                            <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
                        )
                    }
                </Modal.Footer>
            </Modal.Body>
        </Modal> 
    )
}

export default InformacionPagoModal
