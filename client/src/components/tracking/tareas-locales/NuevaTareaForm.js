import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Form, Row, Col, Navbar, Alert } from 'react-bootstrap'

import { STATUS_TAREA_LOCAL } from '../../../context/TareasLocalesContext'
import { useOlimpio } from '../../../context/OlimpioContext'
import { useAuth } from '../../../hooks/useAuth'
import { TAMANO_CONTROLES, formateaFechaForm, formateaHoraForm, isBlank } from '../../comun/utils'

import TicketInput from '../../comun/TicketInput'
import TipoServicioSelect from '../../comun/TipoServicioSelect'
import TipoTrabajolSelect from '../../comun/TipoTrabajoSelect'

import { useMutation, useQueryClient } from 'react-query'
import { QUERY_TAREAS_LOCALES_ACTIVAS } from '../../../queries/TareaLocal'
import { creaTareaLocal } from '../../../mutations/TareaLocal'

const NuevaTareaForm = ({onExito}) => {    
  const navigate = useNavigate()
  const { sucursalActual } = useOlimpio()
  const { credenciales } = useAuth()

  // Modals
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: '',
    tipo: 'danger'
  })

  const [tareaLocal, setTareaLocal] = useState({
    ticket: '',
    descripcion: '',
    id_tipo_trabajo: 0,
    fecha_requerida: formateaFechaForm(new Date()),
    hora_requerida: formateaHoraForm(new Date()),
    id_tipo_servicio: 0
  })
  const [errors, setErrors] = useState({})

  const queryClient = useQueryClient()
  const { mutate: doCreaTareaLocal } = useMutation ({
    mutationFn: creaTareaLocal,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_LOCALES_ACTIVAS] })
        navigate(-1)
    },
    onError: (err) => {
        despliegaAlerta(err.message, 'danger')
    }
  })

  function handleChange(e) {
    setTareaLocal(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))

    // Si hay errores, los quito de la forma
    if (!!errors[[e.target.name]]) {
        setErrors({...errors, [e.target.name]: null})
    }
  }

  function handleCancelar() {
    navigate(-1)
  }

  function findFormErrors() {
    const { ticket, descripcion, id_tipo_trabajo, fecha_requerida, hora_requerida, id_tipo_servicio } = tareaLocal
    const newErrors = {}

    if (!ticket || isBlank(ticket)) newErrors.ticket = 'Captura el ticket'
    if (!descripcion || isBlank(descripcion)) newErrors.descripcion = 'Captur la descripción'
    if (!id_tipo_trabajo || parseInt(id_tipo_trabajo) === 0) newErrors.id_tipo_trabajo = 'Captura el tipo de trabajo'
    if (!fecha_requerida || isBlank(fecha_requerida)) newErrors.fecha_requerida = 'Captura la fecha requerida'
    if (!hora_requerida || isBlank(hora_requerida)) newErrors.hora_requerida = 'Captura la hora requerida'
    if (!id_tipo_servicio || parseInt(id_tipo_servicio) === 0) newErrors.id_tipo_servicio = 'Captura el tipo de servicio'

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
        const nuevaTareaLocal = {
            id_sucursal: sucursalActual,
            ticket: tareaLocal.ticket,
            descripcion: tareaLocal.descripcion,
            id_tipo_trabajo: tareaLocal.id_tipo_trabajo,
            fecha_requerida: tareaLocal.fecha_requerida,
            hora_requerida: tareaLocal.hora_requerida,
            id_tipo_servicio: tareaLocal.id_tipo_servicio,
            id_estado_tarea: STATUS_TAREA_LOCAL.POR_ATENDERSE,
            fecha_creacion: new Date(),
            id_creado_por: credenciales.id_usuario
        } 

        doCreaTareaLocal(nuevaTareaLocal)
    }
  }

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
                Nueva Tarea Local
            </Button>
        </Navbar>
        <Form onSubmit={onSubmit}>
            <Row>
                <Form.Group as={Col} className="mb-2">
                    <Form.Label column={TAMANO_CONTROLES}># de Ticket</Form.Label>
                    <TicketInput
                        size={TAMANO_CONTROLES}
                        onChange={ticketCapturado => setTareaLocal(prevValue => ({...prevValue, ticket: ticketCapturado}))}
                        value={tareaLocal.ticket}
                        type='number'
                        placeholder="Escribe el número de ticket..." 
                        name='ticket' 
                        isInvalid={ !!errors.ticket }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.ticket }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-2">
                <Form.Label column={TAMANO_CONTROLES}>Descripción</Form.Label>
                <Form.Control 
                    size={TAMANO_CONTROLES}
                    onChange={handleChange}
                    value={tareaLocal.descripcion}
                    type='text'
                    placeholder="Escribe la descripción de la mercancía..." 
                    name='descripcion' 
                    isInvalid={ !!errors.descripcion }
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.descripcion }
                </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-2">
                    <TipoTrabajolSelect 
                        label="Tipo de Trabajo"
                        onChange={handleChange}
                        value={tareaLocal.id_tipo_trabajo}
                        name='id_tipo_trabajo' 
                        isInvalid={ !!errors.id_tipo_trabajo }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.id_tipo_trabajo }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mb-2">
                    <TipoServicioSelect 
                        label='Tipo de Servicio'
                        onChange={handleChange}
                        value={tareaLocal.id_tipo_servicio}
                        name='id_tipo_servicio' 
                        isInvalid={ !!errors.id_tipo_servicio }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.id_tipo_servicio }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-2">
                    <Form.Label column={TAMANO_CONTROLES}>Fecha Requerida</Form.Label>
                    <Form.Control
                        size={TAMANO_CONTROLES}
                        type='date'
                        onChange={handleChange}
                        value={tareaLocal.fecha_requerida}
                        name='fecha_requerida' 
                        min={formateaFechaForm(Date())}
                        isInvalid={ !!errors.fecha_requerida }
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
                        value={tareaLocal.hora_requerida}
                        name='hora_requerida' 
                        isInvalid={ !!errors.hora_requerida }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.hora_requerida }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button variant='secondary' size={TAMANO_CONTROLES} onClick={handleCancelar}>
                Cancelar
            </Button>
            {" "}
            <Button variant='primary' size={TAMANO_CONTROLES} type='submit'>
                Crear Tarea Local
            </Button>
        </Form>
    </>
  )
}

export default NuevaTareaForm
