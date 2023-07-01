import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons'

import { Button, Card, Col, Form, Spinner } from 'react-bootstrap'
import { FaPhoneAlt, FaTicketAlt, FaUserAlt } from 'react-icons/fa'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { cancelaServicioDomicilio } from "../../../mutations/ServicioDomicilio"
import { useAuth } from '../../../hooks/useAuth'

import { isBlank, esEntrega, TAMANO_CONTROLES } from '../../comun/utils'
import { QUERY_SERVICIO_DOMICILIO, QUERY_SERVICIOS_DOMICILIO_ACTIVOS, fetchServicioDomicilio } from '../../../queries/ServicioDomicilio'

const InformacionGeneralForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()

    const idServicioDomicilio = location.state.id_servicio_domicilio
    const { credenciales } = useAuth()
    const [formaCancelar, setFormaCancelar] = useState({
        nota_cancelacion: '',
    })
    const [errors, setErrors] = useState({})

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: [QUERY_SERVICIO_DOMICILIO, idServicioDomicilio], 
        queryFn: fetchServicioDomicilio,
        retry: false
    })

    const { mutate: doCancelaServicioDomicilio } = useMutation ({
        mutationFn: cancelaServicioDomicilio,
        onSuccess: () => {
            refetch()
            queryClient.invalidateQueries({ queryKey: [QUERY_SERVICIOS_DOMICILIO_ACTIVOS] })
            navigate(-1)
        }
      })
    
    function handleSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            doCancelaServicioDomicilio({
                id_servicio_domicilio: idServicioDomicilio, 
                id_usuario: credenciales.id_usuario, 
                informacionCancelacion: formaCancelar
            })
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

    if (isLoading) return <Spinner animation="border" />

    if (error) return <span>{error.message}</span>

    const servicioDomicilio = data[0]
    
    return (
        <>
            <Button variant="dark" size={TAMANO_CONTROLES}>
                Cancelción de Servicio a Domicilio
            </Button>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2 olimpio-font-size">
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
                <Form.Group as={Col} className="mb-2">
                    <Form.Label column={TAMANO_CONTROLES}>Motivo de la Cancelación</Form.Label>
                    <Form.Control
                        size={TAMANO_CONTROLES}
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
                <Button variant="secondary" onClick={handleCancelar} size={TAMANO_CONTROLES}>Regresar</Button><span> </span>
                <Button variant="primary" onClick={handleSubmit} size={TAMANO_CONTROLES}>Cancelar Servicio a Domicilio</Button>
            </Form>
        </>
    )
}

export default InformacionGeneralForm
