import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button, Col, Form } from 'react-bootstrap'

import { useMutation } from 'react-query'
import { cancelaServicioDomicilio } from "../../../mutations/ServicioDomicilio"
import { useAuth } from '../../../hooks/useAuth'

import { isBlank } from '../../comun/utils'

const InformacionGeneralForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const idServicioDomicilio = location.state.id_servicio_domicilio
    const { credenciales } = useAuth()
    const [formaCancelar, setFormaCancelar] = useState({
        nota_cancelacion: '',
    })
    const [errors, setErrors] = useState({})

    const { mutate: doCancelaServicioDomicilio } = useMutation ({
        mutationFn: cancelaServicioDomicilio,
    })
    
    function handleSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            doCancelaServicioDomicilio({
                id_servicio_domicilio: idServicioDomicilio, 
                id_usuario: credenciales.id_usuario, 
                informacionCancelacion: formaCancelar
            })
            navigate(-1)
        }
    }

    function handleChange(e) {
        setFormaCancelar(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))

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
            nota_cancelacion 
        } = formaCancelar
        const newErrors = {}
    
        if (!nota_cancelacion || isBlank(nota_cancelacion)) newErrors.nota_cancelacion = 'Captura el motivo de la cancelación'
    
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
    
    return (
        <>
            <Button variant="dark" size="md">
                Cancelción de Servicio
            </Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Motivo de la Cancelación</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={2}
                        onChange={handleChange}
                        value={formaCancelar.nota_cancelacion}
                        placeholder="Escribe el motivo de la cancelación..." 
                        name='nota_cancelacion' 
                        isInvalid={ !!errors.nota_cancelacion }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.nota_cancelacion }
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="secondary" onClick={handleCancelar}>Cancelar</Button><span> </span>
                <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
            </Form>
        </>
    )
}

export default InformacionGeneralForm
