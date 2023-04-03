import { Spinner } from "react-bootstrap"

import { useTareasExternas } from "../../../context/TareasExternasContext"

import { useQuery } from "react-query"
import { fetchServiciosDomicilioActivos, QUERY_SERVICIOS_DOMICILIO_ACTIVOS } from '../../../queries/ServicioDomicilio'

import ListaServiciosDomicilio from "./ListaServiciosDomicilio"
import { STATUS_SERVICIO_DOMICILIO } from "../../../context/ServiciosDomicilioContext"

const RecolectadoParaEntregaEnSucursal = () => {
  const { sucursalActual, ticketFiltro, sucursalFiltro } = useTareasExternas()
  const { data: serviciosDomicilio, isLoading } = useQuery(QUERY_SERVICIOS_DOMICILIO_ACTIVOS, fetchServiciosDomicilioActivos)

  if (isLoading) return <Spinner animation="border" />

  if (serviciosDomicilio) {
    // Obtengo las tareas que voy a desplegar
    var serviciosFiltrados = serviciosDomicilio.filter(servicioDomicilio => 
        parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL &&
        parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) &&  
        (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && servicioDomicilio.ticket.includes(ticketFiltro))) &&
        (sucursalFiltro === 0 || (sucursalFiltro !== 0 && servicioDomicilio.id_sucursal === sucursalFiltro)) 
    )
  }

  return (
    <ListaServiciosDomicilio
      serviciosDomicilio={serviciosFiltrados} 
      titulo='Recolectados para Entrega en Sucursal'
      siguienteEstado={STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL}
      textoContinuar='Recibir'
      textoConfirmacion='¿Seguro que quieres recibir el servicio a domicilio?'
    />
  )
}

export default RecolectadoParaEntregaEnSucursal
