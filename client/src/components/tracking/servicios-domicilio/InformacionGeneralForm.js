import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button, Col, Form, Spinner } from 'react-bootstrap'

import { useQuery, useMutation } from 'react-query'
import { actualizaInfoPago } from "../../../mutations/ServicioDomicilio"
import { useAuth } from '../../../hooks/useAuth'
import { fetchServicioDomicilio, QUERY_SERVICIO_DOMICILIO } from '../../../queries/ServicioDomicilio'

import { isBlank, pagado, esEntrega } from '../../comun/utils'
import PhoneNumberInput from '../../comun/PhoneNumberInput'

const InformacionGeneralForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const idServicioDomicilio = location.state.id_servicio_domicilio
    const { credenciales } = useAuth()
    const [formaInformacionGeneral, setFormaInformacionGeneral] = useState({
        nombre: '',
        direccion: '',
        ubicacion: '',
        telefono: '',
        ticket: '',
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
                setFormaInformacionGeneral(prevValue => ({...prevValue, 
                    ticket: servicioDomicilio?.ticket,
                    nombre: servicioDomicilio?.nombre,
                    direccion: servicioDomicilio?.direccion,
                    ubicacion: servicioDomicilio?.ubicacion,
                    telefono: servicioDomicilio?.telefono
                }))
            }
        }
    )

    function handleSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            doActualizaInfoPago({id_servicio_domicilio: idServicioDomicilio, id_usuario: credenciales.id_usuario, infoGeneral: formaInformacionGeneral})
            navigate(-1)
        }
    }

    function handleChange(e) {
        setFormaInformacionGeneral(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))

        // Si hay errores, los quito de la forma
        if (!!errors[[e.target.name]]) {
            setErrors({...errors, [e.target.name]: null})
        }
    }

    function handlePhoneChange(phone) {
        setFormaInformacionGeneral(prevValue => ({...prevValue, telefono: phone}))
    
        // Si hay errores, los quito de la forma
        if (!!errors["telefono"]) {
            setErrors({...errors, telefono: null})
        }
      }
    
    function handleCancelar() {
        navigate(-1)
    }

    function findFormErrors() {
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
                Información General
            </Button>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    value={servicioDomicilio.nombre}
                    type='text'
                    placeholder="Escribe el nombre del cliente..." 
                    name='nombre' 
                    isInvalid={ !!errors.nombre }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.nombre }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control 
                    onChange={handleChange}
                    value={servicioDomicilio.direccion}
                    type='text'
                    placeholder="Escribe la dirección del cliente..." 
                    name='direccion' 
                    isInvalid={ !!errors.direccion }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.direccion }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Ubicación</Form.Label>
                <Form.Control 
                    onChange={handleChange}
                    value={servicioDomicilio.ubicacion}
                    type='text'
                    placeholder="Escribe la ubicación del cliente..." 
                    name='ubicacion' 
                />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <PhoneNumberInput 
                    name='telefono'
                    initialValue={servicioDomicilio?.telefono}
                    placeholder="Escribe el teléfono del cliente..."
                    onChange={handlePhoneChange}
                    isInvalid={ !!errors.telefono }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.telefono }
                </Form.Control.Feedback>
            </Form.Group>
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

export default InformacionGeneralForm
