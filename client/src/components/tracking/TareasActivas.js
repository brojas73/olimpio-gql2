import { Spinner } from "react-bootstrap"

import { useTareasExternas } from "../../context/TareasExternasContext"
import { useQuery } from "@apollo/client"

import { GET_TAREAS_EXTERNAS_ACTIVAS_BY_ORIGEN } from '../../queries/TareaExterna'
import ListaTareasExternas from "./ListaTareasExternas"

const TareasActivas = () => {
  const { sucursalActual, ticketFiltro, sucursalFiltro, tipoTrabajoFiltro, tipoServicioFiltro } = useTareasExternas()
  const { data: tareasActivas, loading } = useQuery(GET_TAREAS_EXTERNAS_ACTIVAS_BY_ORIGEN, {
    variables: {
      id_sucursal: sucursalActual
    }
  })

  // Esto es para poner en el filtro que estamos en las tareas activas cuando
  // dieron click al TRACKING en el menú de la barra de navegación global "GlobalNavbar"
  // setEstadoActual(STATUS_TAREA.TAREAS_ACTIVAS)

  if (loading) return <Spinner animation="border" />

  if (tareasActivas) {
    // Obtengo las tareas que voy a desplegar
    var tareasFiltradas = tareasActivas.tareasExternasActivasByOrigen.filter(tareaExterna => 
      (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && tareaExterna.ticket.includes(ticketFiltro))) &&
      (sucursalFiltro === 0 || (sucursalFiltro !== 0 && (tareaExterna.sucursal_origen.id_sucursal === sucursalFiltro || tareaExterna.sucursal_destino.id_sucursal === sucursalFiltro))) &&
      (tipoTrabajoFiltro === 0 || (tipoTrabajoFiltro !== 0 && tareaExterna.tipo_trabajo.id_tipo_trabajo === tipoTrabajoFiltro)) &&
      (tipoServicioFiltro === 0 || (tipoServicioFiltro !== 0 && tareaExterna.tipo_servicio.id_tipo_servicio === tipoServicioFiltro))
    )
  }

  return (
    <ListaTareasExternas
      tareasExternas={tareasFiltradas} 
      titulo='Tareas Activas'
    />
  )
}

export default TareasActivas
