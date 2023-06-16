import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Form, Row, Col, Navbar, Accordion, Alert } from 'react-bootstrap'

import { useOlimpio } from '../../../context/OlimpioContext'
import { useAuth } from '../../../hooks/useAuth'
import { formateaFechaForm, formateaHoraForm, isBlank, TAMANO_CONTROLES} from '../../comun/utils'

import TicketInput from '../../comun/TicketInput'
import PhoneNumberInput from '../../comun/PhoneNumberInput'
import TipoServicioSelect from './TipoServicioSelect'
import FormasPagoSelect from '../../comun/FormaPagoSelect'

import { useMutation, useQueryClient } from 'react-query'
import { QUERY_SERVICIOS_DOMICILIO_ACTIVOS } from '../../../queries/ServicioDomicilio'
import { creaServicioDomicilio } from '../../../mutations/ServicioDomicilio'
import { STATUS_SERVICIO_DOMICILIO } from '../../../context/ServiciosDomicilioContext'

const NuevoServicioForm = ({onExito}) => {    
  const navigate = useNavigate()
  const { sucursalActual } = useOlimpio()
  const { credenciales } = useAuth()
  const [tituloAcordeon, setTituloAcordeon] = useState('Mostrar más...')

  // Modals
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: '',
    tipo: 'danger'
  })

  const [servicioDomicilio, setServicioDomicilio] = useState({
    tipo_servicio: '',
    fecha_requerida: formateaFechaForm(new Date()),
    hora_requerida: formateaHoraForm(new Date()),
    nombre: '',
    direccion: '',
    colonia: '',
    municipio: '',
    cp: '',
    ubicacion: '',
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
        queryClient.invalidateQueries({ queryKey: [QUERY_SERVICIOS_DOMICILIO_ACTIVOS] })
        navigate(-1)
    },
    onError: (err) => {
        despliegaAlerta(err.message, 'danger')
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
            ubicacion: servicioDomicilio.ubicacion,
            telefono: servicioDomicilio.telefono,
            id_estado_servicio_domicilio: esEntrega() ? STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL : STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE,
            id_usuario: credenciales.id_usuario
        } 

        doCreaServicioDomicilio(nuevoServicioDomicilio)
    }
  }

  // Funciones
  function despliegaAlerta(mensaje, tipoAlerta='success') {
    setAlerta(prevValue => ({...prevValue, mostrar: true, mensaje: mensaje, tipo: tipoAlerta}))
    window.setTimeout(() => {
        setAlerta(prevValue => ({...prevValue, mostrar: false}))
    }, 10000)
  }  
    
  return (
    <>
        <Alert
            show={alerta.mostrar} 
            variant={alerta.tipo} 
            onClose={() => setAlerta(prevValue => ({...prevValue, mostrar: false}))} 
            dismissible
        >
            {alerta.mensaje}
        </Alert>
        <Navbar>
            <Button variant="dark" size={TAMANO_CONTROLES}>
                Nuevo Servicio a Domicilio
            </Button>
        </Navbar>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-2">
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
                        <Form.Group as={Col} className="mb-2">
                            <Form.Label column={TAMANO_CONTROLES}>Ticket</Form.Label>
                            <TicketInput
                                size={TAMANO_CONTROLES}
                                onChange={ticketCapturado => setServicioDomicilio(prevValue => ({...prevValue, ticket: ticketCapturado}))}
                                value={servicioDomicilio.ticket}
                                type='number'
                                placeholder="Escribe el número de ticket..." 
                                name='ticket' 
                                isInvalid={ !!errors.ticket }
                            />
                            <Form.Control.Feedback type='invalid'>
                                { errors.ticket }
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-2">
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
                        <Form.Group className="mb-2">
                            <Form.Label column={TAMANO_CONTROLES}>Notas</Form.Label>
                            <Form.Control 
                                size={TAMANO_CONTROLES}
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
                <Form.Group as={Col} className="mb-2">
                    <Form.Label column={TAMANO_CONTROLES}>Fecha Requerida</Form.Label>
                    <Form.Control 
                        size={TAMANO_CONTROLES}
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
                <Form.Group as={Col} className="mb-2">
                    <Form.Label column={TAMANO_CONTROLES}>Hora Requerida</Form.Label>
                    <Form.Control
                        size={TAMANO_CONTROLES}
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
            <Form.Group as={Col} className="mb-2">
                <Form.Label column={TAMANO_CONTROLES}>Nombre</Form.Label>
                <Form.Control
                    size={TAMANO_CONTROLES}
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
            <Form.Group as={Col} className="mb-2">
                <Form.Label column={TAMANO_CONTROLES}>Teléfono</Form.Label>
                <PhoneNumberInput 
                    size={TAMANO_CONTROLES}
                    name='telefono'
                    placeholder="Escribe el teléfono del cliente..."
                    onChange={handlePhoneChange}
                    isInvalid={ !!errors.telefono }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.telefono }
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-2">
                <Form.Label column={TAMANO_CONTROLES}>Dirección</Form.Label>
                <Form.Control 
                    size={TAMANO_CONTROLES}
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
            <Accordion className='my-3' onSelect={(e) => e ? setTituloAcordeon('Mostrar menos') : setTituloAcordeon('Mostrar más...')} >
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>{tituloAcordeon}</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group as={Col} className="mb-2">
                            <Form.Label column={TAMANO_CONTROLES}>Colonia <small>(opcional)</small></Form.Label>
                            <Form.Control 
                                size={TAMANO_CONTROLES}
                                onChange={handleChange}
                                value={servicioDomicilio.colonia}
                                type='text'
                                placeholder="Escribe la colonia del cliente..." 
                                name='colonia' 
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-2">
                            <Form.Label column={TAMANO_CONTROLES}>Delegación <small>(opcional)</small></Form.Label>
                            <Form.Control 
                                size={TAMANO_CONTROLES}
                                onChange={handleChange}
                                value={servicioDomicilio.municipio}
                                type='text'
                                placeholder="Escribe la delegación del cliente..." 
                                name='municipio' 
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-2">
                            <Form.Label column={TAMANO_CONTROLES}>Código Postal <small>(opcional)</small></Form.Label>
                            <Form.Control 
                                size={TAMANO_CONTROLES}
                                onChange={handleChange}
                                value={servicioDomicilio.cp}
                                type='number'
                                placeholder="Escribe el código postal del cliente..." 
                                name='cp' 
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-2">
                            <Form.Label column={TAMANO_CONTROLES}>Ubicación <small>(opcional)</small></Form.Label>
                            <Form.Control 
                                size={TAMANO_CONTROLES}
                                onChange={handleChange}
                                value={servicioDomicilio.ubicacion}
                                type='text'
                                placeholder="Escribe la ubicación del cliente..." 
                                name='ubicacion' 
                            />
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Button variant='secondary' onClick={handleCancelar} size={TAMANO_CONTROLES} className='mb-3'>
                Cancelar
            </Button>
            {" "}
            <Button variant='primary' type='submit' size={TAMANO_CONTROLES} className='mb-3'>
                Crear Servicio a Domicilio
            </Button>
        </Form>
    </>
  )
}

export default NuevoServicioForm
