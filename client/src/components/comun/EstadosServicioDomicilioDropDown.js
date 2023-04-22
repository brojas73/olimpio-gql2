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
          parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.TERMINADO &&        // No muestro los servicios terminados
          parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.CANCELADO           // Ni los cancelados
        )

        .map(estadoServicioDomicilio => {
          if (                                                                                                             // En estos casos pongo separador después del texto
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
                  <NavDropdown.Divider key={`divider-${estadoServicioDomicilio.id_estado_servicio_domicilio}`}/>
                </>
            )
          } else {                                                                                                          // Aquí no pongo separadores, sólo el texto
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
