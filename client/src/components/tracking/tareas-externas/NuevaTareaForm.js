import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Form, Row, Col, Navbar } from 'react-bootstrap'

import { STATUS_TAREA } from '../../../context/TareasExternasContext'
import { useOlimpio } from '../../../context/OlimpioContext'
import { useAuth } from '../../../hooks/useAuth'
import { TAMANO_CONTROLES, formateaFechaForm, formateaHoraForm, isBlank } from '../../comun/utils'

import TicketInput from '../../comun/TicketInput'
import SucursalSelect from '../../comun/SucursalSelect'
import TipoServicioSelect from '../../comun/TipoServicioSelect'
import TipoTrabajolSelect from '../../comun/TipoTrabajoSelect'

import { useMutation, useQueryClient } from 'react-query'
import { QUERY_TAREAS_EXTERNAS_ACTIVAS } from '../../../queries/TareaExterna'
import { creaTareaExterna } from '../../../mutations/TareaExterna'

const NuevaTareaForm = ({onExito}) => {    
  const navigate = useNavigate()
  const { sucursalActual } = useOlimpio()
  const { credenciales } = useAuth()

  const [tareaExterna, setTareaExterna] = useState({
    ticket: '',
    descripcion: '',
    id_tipo_trabajo: 0,
    id_sucursal_destino: 0,
    fecha_requerida: formateaFechaForm(new Date()),
    hora_requerida: formateaHoraForm(new Date()),
    id_tipo_servicio: 0
  })
  const [errors, setErrors] = useState({})

  const queryClient = useQueryClient()
  const { mutate: doCreaTareaExterna } = useMutation ({
    mutationFn: creaTareaExterna,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS] })
    }
  })

  function handleChange(e) {
    setTareaExterna(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))

    // Si hay errores, los quito de la forma
    if (!!errors[[e.target.name]]) {
        setErrors({...errors, [e.target.name]: null})
    }
  }

  function handleCancelar() {
    navigate(-1)
  }

  function findFormErrors() {
    const { ticket, descripcion, id_tipo_trabajo, id_sucursal_destino, fecha_requerida, hora_requerida, id_tipo_servicio } = tareaExterna
    const newErrors = {}

    if (!ticket || isBlank(ticket)) newErrors.ticket = 'Captura el ticket'
    if (!descripcion || isBlank(descripcion)) newErrors.descripcion = 'Captur la descripción'
    if (!id_tipo_trabajo || parseInt(id_tipo_trabajo) === 0) newErrors.id_tipo_trabajo = 'Captura el tipo de trabajo'
    if (!id_sucursal_destino || parseInt(id_sucursal_destino) === 0) newErrors.id_sucursal_destino = 'Captura la sucursal destino'
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
        const nuevaTareaExterna = {
            id_sucursal_origen: sucursalActual,
            ticket: tareaExterna.ticket,
            descripcion: tareaExterna.descripcion,
            id_tipo_trabajo: tareaExterna.id_tipo_trabajo,
            id_sucursal_destino: tareaExterna.id_sucursal_destino,
            fecha_requerida: tareaExterna.fecha_requerida,
            hora_requerida: tareaExterna.hora_requerida,
            id_tipo_servicio: tareaExterna.id_tipo_servicio,
            id_estado_tarea: STATUS_TAREA.PENDIENTE_RECOLECCION,
            fecha_creacion: new Date(),
            id_creado_por: credenciales.id_usuario,
            estado: 1
        } 
    
        doCreaTareaExterna(nuevaTareaExterna)
        navigate(-1)
    }
  }

  return (
    <>
        <Navbar>
            <Button variant="dark" size={TAMANO_CONTROLES}>
                Nueva Tarea Externa
            </Button>
        </Navbar>
        <Form onSubmit={onSubmit}>
            <Row>
                <Form.Group as={Col} className="mb-2">
                    <Form.Label column={TAMANO_CONTROLES}># de Ticket</Form.Label>
                    <TicketInput
                        size={TAMANO_CONTROLES}
                        onChange={ticketCapturado => setTareaExterna(prevValue => ({...prevValue, ticket: ticketCapturado}))}
                        value={tareaExterna.ticket}
                        type='number'
                        placeholder="Escribe el número de ticket..." 
                        name='ticket' 
                        isInvalid={ !!errors.ticket }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.ticket }
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className="mb-2">
                    <SucursalSelect 
                        label='Sucursal Destino'
                        onChange={handleChange} 
                        value={tareaExterna.id_sucursal_destino}
                        name='id_sucursal_destino' 
                        filtraSucursalActual={true}
                        isInvalid={ !!errors.id_sucursal_destino }
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.id_sucursal_destino }
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Group className="mb-2">
                <Form.Label column={TAMANO_CONTROLES}>Descripción</Form.Label>
                <Form.Control 
                    size={TAMANO_CONTROLES}
                    onChange={handleChange}
                    value={tareaExterna.descripcion}
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
                        value={tareaExterna.id_tipo_trabajo}
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
                        value={tareaExterna.id_tipo_servicio}
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
                        value={tareaExterna.fecha_requerida}
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
                        value={tareaExterna.hora_requerida}
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
                Crear Tarea Externa
            </Button>
        </Form>
    </>
  )
}

export default NuevaTareaForm
