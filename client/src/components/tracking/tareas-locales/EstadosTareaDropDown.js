import { Link } from 'react-router-dom'
import { NavDropdown, Spinner } from 'react-bootstrap'

import { STATUS_TAREA_LOCAL } from '../../../context/TareasLocalesContext'
import { useQuery } from 'react-query'
import { fetchEstadosTareaLocal, QUERY_ESTADOS_TAREA_LOCAL } from '../../../queries/EstadosTareaLocal'

import { nombreEstadoTarea } from '../../comun/utils'


const EstadosTareaDropDown = ({onSelect, idSelected }) => {
  const { data: estadosTarea, isLoading } = useQuery(QUERY_ESTADOS_TAREA_LOCAL, fetchEstadosTareaLocal, { staleTime: Infinity, cacheTime: Infinity})
  const titulo = nombreEstadoTarea(estadosTarea, idSelected)

  if (isLoading) return <Spinner animation='border' />

  return (
    <NavDropdown title={titulo} className='olimpio-font-size'>
    {
      estadosTarea 
      .filter(estadoTarea => (
        parseInt(estadoTarea.id_estado_tarea) !== STATUS_TAREA_LOCAL.CERRADO &&           // No muestro estos estados en la lista
        parseInt(estadoTarea.id_estado_tarea) !== STATUS_TAREA_LOCAL.REDIRECCIONADO 
      ))
      .map(estadoTarea => {
          if (parseInt(estadoTarea.id_estado_tarea) === STATUS_TAREA_LOCAL.TAREAS_ACTIVAS) {                    // Pongo un separador después del título de tareas activas
            return (
              <>
                <NavDropdown.Item 
                  as={Link}
                  key={estadoTarea.id_estado_tarea}
                  onClick={() => onSelect(estadoTarea.id_estado_tarea)}
                  className="olimpio-font-size"
                >
                  {estadoTarea.nombre}
                </NavDropdown.Item>
                <NavDropdown.Divider key={`div-${estadoTarea.id_estado_tarea}`}/>
              </>
            )
          } else {                                                                                        // En todos los demás casos, sólo pongo el titulo
            return (
              <NavDropdown.Item 
                as={Link}
                key={estadoTarea.id_estado_tarea}
                onClick={() => onSelect(estadoTarea.id_estado_tarea)}
                className="olimpio-font-size"
              >
                {estadoTarea.nombre}
              </NavDropdown.Item>
            )
          }
        })
    }
    </NavDropdown>
  )
}

export default EstadosTareaDropDown
