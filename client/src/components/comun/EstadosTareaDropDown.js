import { Link } from 'react-router-dom'
import { NavDropdown, Spinner } from 'react-bootstrap'

import { STATUS_TAREA } from '../../context/TareasExternasContext'

import { useQuery } from '@apollo/client'
import { GET_ESTADOS_TAREA } from '../../queries/EstadoTarea'
import { nombreEstadoTarea } from './utils'


const EstadosTareaDropDown = ({onSelect, idSelected }) => {
  const { data, loading } = useQuery(GET_ESTADOS_TAREA)

  if (loading) return <Spinner animation='border' />

  return (
    <NavDropdown title={nombreEstadoTarea(data.estadosTarea, idSelected)}>
    {
      data.estadosTarea
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
