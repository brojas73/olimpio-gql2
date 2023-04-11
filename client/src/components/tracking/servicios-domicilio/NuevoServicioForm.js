import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, Form, Row, Col, Navbar } from 'react-bootstrap'

import { useTareasExternas } from '../../../context/TareasExternasContext'
import { useAuth } from '../../../hooks/useAuth'
import { formateaFechaForm, formateaHoraForm, isBlank} from '../../comun/utils'

import PhoneNumberInput from '../../comun/PhoneNumberInput'
import TipoServicioSelect from './TipoServicioSelect'
import FormasPagoSelect from '../../comun/FormaPagoSelect'

import { useMutation, useQueryClient } from 'react-query'
import { creaServicioDomicilio } from '../../../mutations/ServicioDomicilio'
import { STATUS_SERVICIO_DOMICILIO } from '../../../context/ServiciosDomicilioContext'

const NuevoServicioForm = ({onExito}) => {    
  const navigate = useNavigate()
  const { sucursalActual } = useTareasExternas()
  const { credenciales } = useAuth()

  const [servicioDomicilio, setServicioDomicilio] = useState({
    tipo_servicio: '',
    fecha_requerida: formateaFechaForm(new Date()),
    hora_requerida: formateaHoraForm(new Date()),
    nombre: '',
    direccion: '',
    telefono: '',
    ticket: '',
    id_forma_pago: 0,
    notas_pago: ''
  })
  const [errors, setErrors] = useState({})

  const queryClient = useQueryClient()
  const { mutate: doCreaServicioDomicilio } = useMutation ({
    mutationFn: creaServicioDomicilio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [''] })
    }
  })

  function handleChange(e) {
    setServicioDomicilio(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))

    // Si hay errores, los quito de la forma
    if (!!errors[[e.target.name]]) {
        setErrors({...errors, [e.target.name]: null})
    }
  }

  function handlePhoneChange(phone) {
    setServicioDomicilio(prevValue => ({...prevValue, telefono: phone}))

    // Si hay errores, los quito de la forma
    if (!!errors["telefono"]) {
        setErrors({...errors, telefono: null})
    }
  }

  function handleCancelar() {
    navigate(-1)
  }

  function esEntrega() {
    return servicioDomicilio.tipo_servicio === 'E'
  }

  function findFormErrors() {
    const { 
        tipo_servicio, 
        fecha_requerida, 
        hora_requerida, 
        nombre, 
        direccion, 
        telefono, 
        ticket,
        id_forma_pago
    } = servicioDomicilio
    const newErrors = {}

    if (tipo_servicio === '') newErrors.tipo_servicio = 'Selecciona un tipo de servicio'
    if (!fecha_requerida || isBlank(fecha_requerida)) newErrors.fecha_requerida = 'Captura la fecha requerida'
    if (!hora_requerida || isBlank(hora_requerida)) newErrors.hora_requerida = 'Captura la hora requerida'
    if (!nombre || isBlank(nombre)) newErrors.nombre = 'Captura el nombre del cliente'
    if (!direccion || isBlank(direccion)) newErrors.direccion = 'Captura la dirección del cliente'
    if (telefono.length !== 14) newErrors.telefono = 'Captura un teléfono válido (10 dígitos)' 

    // El ticket sólo se requiere cuando es una entrega
    if (esEntrega()) {
        if (!ticket || isBlank(ticket)) newErrors.ticket  = 'Captura el ticket' 
        if (id_forma_pago === 0) newErrors.id_forma_pago = 'Selecciona una forma de pago'
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
  
  function onSubmit(event) {
    event.preventDefault()
    if (isValid()) {
        const nuevoServicioDomicilio = {
            id_sucursal: sucursalActual,
            tipo_servicio: servicioDomicilio.tipo_servicio,
            ticket: servicioDomicilio.ticket,
            id_forma_pago: servicioDomicilio.id_forma_pago,
            notas_pago: servicioDomicilio.notas_pago,
            fecha_requerida: servicioDomicilio.fecha_requerida,
            hora_requerida: servicioDomicilio.hora_requerida,
            nombre: servicioDomicilio.nombre,
            direccion: servicioDomicilio.direccion,
            telefono: servicioDomicilio.telefono,
            id_estado_servicio_domicilio: esEntrega() ? STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL : STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE,
            id_usuario: credenciales.id_usuario
        } 

        doCreaServicioDomicilio(nuevoServicioDomicilio)
        navigate(-1)
    }
  }

  return (
    <Container>
        <Navbar>
            <Container className="justify-content-start">
                <Button variant="dark" size="md">
                    Nuevo Servicio a Domicilio
                </Button>
            </Container>
        </Navbar>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <TipoServicioSelect 
                    label='Tipo de Servicio'
                    onChange={handleChange} 
                    value={servicioDomicilio.tipo_servicio}
                    name='tipo_servicio' 
                    isInvalid={ !!errors.tipo_servicio }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.tipo_servicio }
                </Form.Control.Feedback>
            </Form.Group>
            {
                esEntrega() && (
                    <>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Ticket</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                value={servicioDomicilio.ticket}
                                type='number'
                                placeholder="Escribe el ticket a entregar..." 
                                name='ticket' 
                                isInvalid={ !!errors.ticket }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errors.ticket }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <FormasPagoSelect 
                                label='Forma de Pago'
                                onChange={handleChange} 
                                value={servicioDomicilio.id_forma_pago} 
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
                                rows={2}
                                onChange={handleChange} 
                                value={servicioDomicilio.notas_pago}
                                name='notas_pago' 
                                placeholder='Captura una nota sobre la forma de pago...'
                                isInvalid={ !!errors.notas_pago }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errors.notas_pago }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </>
                )
            }
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Fecha Requerida</Form.Label>
                    <Form.Control 
                        type='date'
                        onChange={handleChange}
                        value={servicioDomicilio.fecha_requerida}
                        name='fecha_requerida' 
                        min={formateaFechaForm(Date())}
                        isInvalid={ !!errors.fecha_rquerida }
                    />                    
                    <Form.Control.Feedback type='invalid'>
                        { errors.fecha_requerida }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Hora Requerida</Form.Label>
                    <Form.Control
                        type='time'
                        onChange={handleChange}
                        value={servicioDomicilio.hora_requerida}
                        name='hora_requerida' 
                        isInvalid={ !!errors.hora_rquerida }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.hora_requerida }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
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
                <Form.Label>Teléfono</Form.Label>
                <PhoneNumberInput 
                    name='telefono'
                    placeholder="Escribe el teléfono del cliente..."
                    onChange={handlePhoneChange}
                    isInvalid={ !!errors.telefono }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.telefono }
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant='secondary' onClick={handleCancelar}>
                Cancelar
            </Button>
            {" "}
            <Button variant='primary' type='submit'>
                Crear Servicio a Domicilio
            </Button>
        </Form>
    </Container>
  )
}

export default NuevoServicioForm
