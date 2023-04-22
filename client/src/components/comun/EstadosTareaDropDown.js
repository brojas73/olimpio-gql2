import { Link } from 'react-router-dom'
import { NavDropdown, Spinner } from 'react-bootstrap'

import { STATUS_TAREA } from '../../context/TareasExternasContext'

import { useQuery } from 'react-query'
import { fetchEstadosTarea, QUERY_ESTADOS_TAREA } from '../../queries/EstadoTarea'

import { FONT_SIZE_DROPDOWN, nombreEstadoTarea } from './utils'


const EstadosTareaDropDown = ({onSelect, idSelected }) => {
  const { data: estadosTarea, isLoading } = useQuery(QUERY_ESTADOS_TAREA, fetchEstadosTarea, { staleTime: Infinity, cacheTime: Infinity})
  const titulo = nombreEstadoTarea(estadosTarea, idSelected)

  if (isLoading) return <Spinner animation='border' />

  return (
    <NavDropdown title={titulo} style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}>
    {
      estadosTarea 
        .filter(estadoTarea => (
          parseInt(estadoTarea.id_estado_tarea) !== STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN &&           // No muestro estos estados en la lista
          parseInt(estadoTarea.id_estado_tarea) !== STATUS_TAREA.REDIRECCIONADO 
        ))
        .map(estadoTarea => {
          if (parseInt(estadoTarea.id_estado_tarea) === STATUS_TAREA.TAREAS_ACTIVAS) {                    // Pongo un separador después del título de tareas activas
            return (
              <>
                <NavDropdown.Item 
                  as={Link}
                  key={estadoTarea.id_estado_tarea}
                  onClick={() => onSelect(estadoTarea.id_estado_tarea)}
                  style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}
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
                style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}
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
