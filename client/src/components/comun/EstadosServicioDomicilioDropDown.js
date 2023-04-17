import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'

import { NavDropdown, Spinner } from 'react-bootstrap'

import { nombreEstadoServicioDomicilio } from './utils'
import { STATUS_SERVICIO_DOMICILIO } from "../../context/ServiciosDomicilioContext"

import { useQuery } from 'react-query'
import { fetchEstadosServiciosDomicilio, QUERY_ESTADOS_SERVICIO_DOMICILIO } from '../../queries/EstadoServicioDomicilio'

const EstadosServicioDomicilioDropDown = ({onSelect, idSelected }) => {
  const { data: estadosServicioDomicilio, isLoading } = useQuery(
    QUERY_ESTADOS_SERVICIO_DOMICILIO, 
    fetchEstadosServiciosDomicilio, 
    { staleTime: Infinity, cacheTime: Infinity}
  )
  const location = useLocation()
  
  if (isLoading) return <Spinner animation='border' />

  const titulo = location.pathname.includes('servicios-activos') ? 
                    'Estado del Servicio' : 
                    nombreEstadoServicioDomicilio(estadosServicioDomicilio, idSelected)
  
  return (
    <NavDropdown title={titulo}>
    {
      estadosServicioDomicilio 
        .filter(estadoServicioDomicilio => 
          parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.TERMINADO &&
          parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.CANCELADO
        )

        .map(estadoServicioDomicilio => (
          <NavDropdown.Item 
            as={Link}
            to={estadoServicioDomicilio.url}
            key={estadoServicioDomicilio.id_estado_servicio_domicilio}
            onClick={() => onSelect(estadoServicioDomicilio.id_estado_servicio_domicilio)}
          >
            {estadoServicioDomicilio.nombre}
          </NavDropdown.Item>
        ))
    }
    </NavDropdown>
  )
}

export default EstadosServicioDomicilioDropDown
