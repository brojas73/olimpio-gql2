import { useState } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useTareasExternas } from '../../context/TareasExternasContext'
import { STATUS_TAREA } from '../../context/TareasExternasContext'
import { useAuth } from '../../hooks/useAuth'

import SucursalSelect from '../comun/SucursalSelect'
import TipoServicioSelect from '../comun/TipoServicioSelect'
import TipoTrabajolSelect from '../comun/TipoTrabajoSelect'

import { useMutation } from '@apollo/client'
import { CREA_TAREA_EXTERNA } from '../../mutations/TareaExterna'
import { GET_TAREAS_EXTERNAS_ACTIVAS } from '../../queries/TareaExterna'
import { GET_TAREAS_EXTERNAS_LOG } from '../../queries/TareaExternaLog'

const NuevaTareaForm = ({onExito}) => {    
  const navigate = useNavigate()

  const { sucursalActual } = useTareasExternas()
  const { credenciales } = useAuth()
  const [tareaExterna, setTareaExterna] = useState({
    ticket: '',
    descripcion: '',
    id_tipo_trabajo: 0,
    id_sucursal_destino: 0,
    fecha_requerida: formateaFecha(new Date()),
    hora_requerida: formateaHora(new Date()),
    id_tipo_servicio: 0
  })
  const [creaTareaExterna] = useMutation (CREA_TAREA_EXTERNA, {
    variables: { 
        id_sucursal_origen: sucursalActual,
        ticket: tareaExterna.ticket,
        descripcion: tareaExterna.descripcion,
        id_tipo_trabajo: tareaExterna.id_tipo_trabajo,
        id_sucursal_destino: tareaExterna.id_sucursal_destino,
        fecha_requerida: tareaExterna.fecha_requerida,
        hora_requerida: tareaExterna.hora_requerida,
        id_tipo_servicio: tareaExterna.id_tipo_servicio,
        id_estado_tarea: STATUS_TAREA.PENDIENTE_RECOLECCION,
        id_usuario: credenciales.id_usuario
    },
    refetchQueries: [
        { query: GET_TAREAS_EXTERNAS_ACTIVAS },
        { query: GET_TAREAS_EXTERNAS_LOG }
      ]
  })

  function handleChange(e) {
    setTareaExterna(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))
  }

  function handleCancelar() {
    navigate(-1)
  }
  
  async function onSubmit(event) {
    event.preventDefault()
    await creaTareaExterna()
    navigate(-1)
  }

  function formateaFecha(fecha) {
    const fechaTmp = new Date(fecha)
    const fechaFormateada = fechaTmp.getFullYear() + '-' + 
                            String((fechaTmp.getMonth() + 1)).padStart(2, '0') + '-' + 
                            String(fechaTmp.getDate()).padStart(2, '0') 
    return fechaFormateada
  }  

  function formateaHora(fecha) {
    const fechaTmp = new Date(fecha)
    const horaFormateada = String(fechaTmp.getHours()).padStart(2, '0') + ':' +
                           String(fechaTmp.getMinutes()).padStart(2, '0')
    return horaFormateada
  }

  return (
    <Container>
        <h2>Nueva Tarea Externa</h2>
        <Form onSubmit={onSubmit}>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label># de Ticket</Form.Label>
                    <Form.Control required
                        onChange={handleChange}
                        value={tareaExterna.ticket}
                        type='number'
                        placeholder="Escribe el número de ticket..." 
                        name='ticket' 
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <SucursalSelect 
                        label='Sucursal Destino'
                        onChange={handleChange} 
                        value={tareaExterna.id_sucursal_destino}
                        name='id_sucursal_destino' 
                        filtraSucursalActual={true}
                    />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control required
                    onChange={handleChange}
                    value={tareaExterna.descripcion}
                    type='text'
                    placeholder="Escribe la descripción de la mercancía..." 
                    name='descripcion' 
                />
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <TipoTrabajolSelect 
                        label="Tipo de Trabajo"
                        onChange={handleChange}
                        value={tareaExterna.id_tipo_trabajo}
                        name='id_tipo_trabajo' 
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <TipoServicioSelect 
                        label='Tipo de Servicio'
                        onChange={handleChange}
                        value={tareaExterna.id_tipo_servicio}
                        name='id_tipo_servicio' 
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Fecha Requerida</Form.Label>
                    <Form.Control required
                        type='date'
                        onChange={handleChange}
                        value={tareaExterna.fecha_requerida}
                        name='fecha_requerida' 
                        min={formateaFecha(Date())}
                    />                    
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Hora Requerida</Form.Label>
                    <Form.Control required
                        type='time'
                        onChange={handleChange}
                        value={tareaExterna.hora_requerida}
                        name='hora_requerida' 
                    />
                </Form.Group>
            </Row>
            <Button variant='primary' onClick={handleCancelar}>
                Cancelar
            </Button>
            {" "}
            <Button variant='primary' type='submit'>
                Crear Tarea Externa
            </Button>
        </Form>
    </Container>
  )
}

export default NuevaTareaForm
