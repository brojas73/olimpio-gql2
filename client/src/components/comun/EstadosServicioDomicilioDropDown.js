import { Link } from 'react-router-dom'

import { NavDropdown, Spinner } from 'react-bootstrap'

import { FONT_SIZE_DROPDOWN, nombreEstadoServicioDomicilio } from './utils'
import { STATUS_SERVICIO_DOMICILIO } from "../../context/ServiciosDomicilioContext"

import { useQuery } from 'react-query'
import { fetchEstadosServiciosDomicilio, QUERY_ESTADOS_SERVICIO_DOMICILIO } from '../../queries/EstadoServicioDomicilio'

const EstadosServicioDomicilioDropDown = ({onSelect, idSelected }) => {
  const { data: estadosServicioDomicilio, isLoading } = useQuery(
    QUERY_ESTADOS_SERVICIO_DOMICILIO, 
    fetchEstadosServiciosDomicilio, 
    { staleTime: Infinity, cacheTime: Infinity}
  )
  const titulo = nombreEstadoServicioDomicilio(estadosServicioDomicilio, idSelected)
  
  if (isLoading) return <Spinner animation='border' />

  return (
    <NavDropdown title={titulo} style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}>
    {
      estadosServicioDomicilio 
        .filter(estadoServicioDomicilio => 
          parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.TERMINADO &&
          parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.CANCELADO
        )

        .map(estadoServicioDomicilio => {
          if (
            parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.SERVICIOS_DOMICILIO_ACTIVOS ||
            parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL ||
            parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE
          ) {
            return (
                <>
                  <NavDropdown.Item 
                    as={Link}
                    key={estadoServicioDomicilio.id_estado_servicio_domicilio}
                    onClick={() => onSelect(estadoServicioDomicilio.id_estado_servicio_domicilio)}
                    style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}
                  >
                   {estadoServicioDomicilio.nombre}
                  </NavDropdown.Item>
                  <NavDropdown.Divider key={`div-${estadoServicioDomicilio.id_estado_servicio_domicilio}`}/>
                </>
            )
          } else {
            return (
              <NavDropdown.Item 
                as={Link}
                key={estadoServicioDomicilio.id_estado_servicio_domicilio}
                onClick={() => onSelect(estadoServicioDomicilio.id_estado_servicio_domicilio)}
                style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}
                >
                {estadoServicioDomicilio.nombre}
              </NavDropdown.Item>
            )
          }
        })
    }
    </NavDropdown>
  )
}

export default EstadosServicioDomicilioDropDown
