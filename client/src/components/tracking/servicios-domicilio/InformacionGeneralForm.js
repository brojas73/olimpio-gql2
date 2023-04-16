import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button, Col, Form, Spinner } from 'react-bootstrap'

import { useQuery, useMutation } from 'react-query'
import { actualizaInformacionGeneral } from "../../../mutations/ServicioDomicilio"
import { useAuth } from '../../../hooks/useAuth'
import { fetchServicioDomicilio, QUERY_SERVICIO_DOMICILIO } from '../../../queries/ServicioDomicilio'

import { isBlank, pagado } from '../../comun/utils'
import PhoneNumberInput from '../../comun/PhoneNumberInput'

const InformacionGeneralForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const idServicioDomicilio = location.state.id_servicio_domicilio
    const { credenciales } = useAuth()
    const [formaInformacionGeneral, setFormaInformacionGeneral] = useState({
        nombre: '',
        direccion: '',
        colonia: '',
        municipio: '',
        cp: '',
        ubicacion: '',
        telefono: '',
        ticket: '',
    })
    const [errors, setErrors] = useState({})

    const { mutate: doActualizaInformacionGeneral } = useMutation ({
        mutationFn: actualizaInformacionGeneral,
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
                    colonia: servicioDomicilio?.colonia,
                    municipio: servicioDomicilio?.municipio,
                    cp: servicioDomicilio?.cp,
                    ubicacion: servicioDomicilio?.ubicacion,
                    telefono: servicioDomicilio?.telefono
                }))
            }
        }
    )

    function handleSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            doActualizaInformacionGeneral({id_servicio_domicilio: idServicioDomicilio, id_usuario: credenciales.id_usuario, informacionGeneral: formaInformacionGeneral})
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
        const { 
            nombre, 
            direccion, 
            telefono,
        } = formaInformacionGeneral
        const newErrors = {}
    
        if (!nombre || isBlank(nombre)) newErrors.nombre = 'Captura el nombre del cliente'
        if (!direccion || isBlank(direccion)) newErrors.direccion = 'Captura la dirección del cliente'
        if (telefono.length < 14) newErrors.telefono = 'Captura un teléfono válido (10 dígitos)' 
    
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
                Información General
            </Button>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    value={formaInformacionGeneral.nombre}
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
                    value={formaInformacionGeneral.direccion}
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
                <Form.Label>Colonia</Form.Label>
                <Form.Control 
                    onChange={handleChange}
                    value={formaInformacionGeneral.colonia}
                    type='text'
                    placeholder="Escribe la colonia del cliente..." 
                    name='colonia' 
                />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Delegación</Form.Label>
                <Form.Control 
                    onChange={handleChange}
                    value={formaInformacionGeneral.municipio}
                    type='text'
                    placeholder="Escribe la delegación del cliente..." 
                    name='municipio' 
                />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control 
                    onChange={handleChange}
                    value={formaInformacionGeneral.cp}
                    type='text'
                    placeholder="Escribe el código postal del cliente..." 
                    name='cp' 
                />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Ubicación</Form.Label>
                <Form.Control 
                    onChange={handleChange}
                    value={formaInformacionGeneral.ubicacion}
                    type='text'
                    placeholder="Escribe la ubicación del cliente..." 
                    name='ubicacion' 
                />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <PhoneNumberInput 
                    name='telefono'
                    initialValue={servicioDomicilio.telefono}
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
                <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
            </Form>
        </>
    )
}

export default InformacionGeneralForm
