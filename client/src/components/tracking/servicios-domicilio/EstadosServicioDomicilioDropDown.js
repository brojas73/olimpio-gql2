import { Link } from 'react-router-dom'

import { NavDropdown, Spinner } from 'react-bootstrap'

import { nombreEstadoServicioDomicilio } from '../../comun/utils'
import { STATUS_SERVICIO_DOMICILIO } from "../../../context/ServiciosDomicilioContext"

import { useQuery } from 'react-query'
import { fetchEstadosServiciosDomicilio, QUERY_ESTADOS_SERVICIO_DOMICILIO } from '../../../queries/EstadoServicioDomicilio'

const EstadosServicioDomicilioDropDown = ({onSelect, idSelected }) => {
  const { data: estadosServicioDomicilio, isLoading, error } = useQuery({
    queryKey: [QUERY_ESTADOS_SERVICIO_DOMICILIO], 
    queryFn: fetchEstadosServiciosDomicilio, 
    retry: false,
    staleTime: Infinity, 
    cacheTime: Infinity
  })
  const titulo = nombreEstadoServicioDomicilio(estadosServicioDomicilio, idSelected)
  
  if (isLoading) return <Spinner animation='border' />

  if (error) return <span>{error.message}</span>

  return (
    <NavDropdown title={titulo} className='olimpio-font-size'>
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
                    className="olimpio-font-size"
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
                className="olimpio-font-size"
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
