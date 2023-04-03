import { Spinner } from "react-bootstrap"

import { useTareasExternas } from "../../../context/TareasExternasContext"

import { useQuery } from "react-query"
import { fetchServiciosDomicilioActivos, QUERY_SERVICIOS_DOMICILIO_ACTIVOS } from '../../../queries/ServicioDomicilio'

import ListaServiciosDomicilio from "./ListaServiciosDomicilio"
import { STATUS_SERVICIO_DOMICILIO } from "../../../context/ServiciosDomicilioContext"

const PendienteRecoleccionEnCliente = () => {
  const { sucursalActual, ticketFiltro, sucursalFiltro } = useTareasExternas()
  const { data: serviciosDomicilio, isLoading } = useQuery(QUERY_SERVICIOS_DOMICILIO_ACTIVOS, fetchServiciosDomicilioActivos)

  if (isLoading) return <Spinner animation="border" />

  if (serviciosDomicilio) {
    // Obtengo las tareas que voy a desplegar
    var serviciosFiltrados = serviciosDomicilio.filter(servicioDomicilio => 
        parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE &&
        parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) &&  
        (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && servicioDomicilio.ticket.includes(ticketFiltro))) &&
        (sucursalFiltro === 0 || (sucursalFiltro !== 0 && servicioDomicilio.id_sucursal === sucursalFiltro)) 
    )
  }

  return (
    <ListaServiciosDomicilio
      serviciosDomicilio={serviciosFiltrados} 
      titulo='Pendiente de Recolección en Cliente'
      siguienteEstado={STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL}
      textoContinuar='Recolectar'
      textoBorrar='Borrar'
      textoConfirmacion='¿Seguro que quieres recolectar el servicio a domicilio?'
    />
  )
}

export default PendienteRecoleccionEnCliente
