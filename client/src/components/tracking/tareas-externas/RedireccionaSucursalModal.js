import React, { useState } from 'react'

import { Button, Form, Modal } from 'react-bootstrap'

import SucursalSelect from '../../comun/SucursalSelect'

const RedireccionaSucursalModal = ({mostrar, onConfirmar}) => {
    const [formData, setFormData] = useState({
        id_sucursal_redireccion: 0
    })
    const [errors, setErrors] = useState({})

    function handlerSubmit(event) {
        event.preventDefault()
        if (isValid()) {
            onConfirmar(true, formData.id_sucursal_redireccion)            
        }
    }

    function handlerCancelar() {
        setErrors({})
        onConfirmar(false)
    }

    function handlerChange(e) {
        setFormData(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))

        // Si hay errores, los quito de la forma
        if (!!errors[[e.target.name]]) {
            setErrors({...errors, [e.target.name]: null})
        }
    }

    function findFormErrors() {
        const { id_sucursal_redireccion } = formData
        const newErrors = {}
    
        if (parseInt(id_sucursal_redireccion) === 0) newErrors.id_sucursal_redireccion = 'Selecciona la sucursal a la que quieres desviar la tarea'

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
        <Modal show={mostrar} onHide={handlerCancelar} backdrop="static"> 
            <Modal.Header>
                <Modal.Title>Desvío de Tarea Externa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handlerSubmit}>
                    <Form.Group className="mb-3">
                        <SucursalSelect 
                            label='Sucursal de Desvío'
                            onChange={handlerChange} 
                            value={formData.id_sucursal_redireccion}
                            name='id_sucursal_redireccion' 
                            filtraSucursalActual={true}
                            isInvalid={ !!errors.id_sucursal_redireccion }
                        />
                        <Form.Control.Feedback type='invalid'>
                            { errors.id_sucursal_redireccion }
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlerCancelar} size="sm">Cancelar</Button>
                        <Button variant="primary" onClick={handlerSubmit} size="sm">Desviar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal> 
    )
}

export default RedireccionaSucursalModal
