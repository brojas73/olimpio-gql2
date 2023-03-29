import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom'
import { NavDropdown, Spinner } from 'react-bootstrap'

import { STATUS_TAREA } from '../../context/TareasExternasContext'

import { useQuery } from 'react-query'
import { fetchEstadosTarea } from '../../queries/EstadoTarea'

import { nombreEstadoTarea } from './utils'


const EstadosTareaDropDown = ({onSelect, idSelected }) => {
  const { data: estadosTarea, isLoading } = useQuery('estadosTarea', fetchEstadosTarea)
  const titulo = useLocation().pathname.includes('tareas-activas') ? 'Estado de la Tarea' : nombreEstadoTarea(estadosTarea, idSelected)

  if (isLoading) return <Spinner animation='border' />

  return (
    <NavDropdown title={titulo}>
    {
      estadosTarea 
        .filter(estadoTarea => parseInt(estadoTarea.id_estado_tarea) !== STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN)
        .map(estadoTarea => (
          <NavDropdown.Item 
              as={Link}
              to={estadoTarea.url}
              key={estadoTarea.id_estado_tarea}
              onClick={() => onSelect(estadoTarea.id_estado_tarea)}
          >
            {estadoTarea.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default EstadosTareaDropDown
