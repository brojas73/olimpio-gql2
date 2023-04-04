import { Spinner } from "react-bootstrap"

import { STATUS_TAREA, useTareasExternas } from "../../../context/TareasExternasContext"

import { useQuery } from "react-query"
import { fetchTareasExternasActivas, QUERY_TAREAS_EXTERNAS_ACTIVAS } from "../../../queries/TareaExterna"

import ListaTareasExternas from "./ListaTareasExternas"

const RecibidosParaAtenderse = () => {
  const { sucursalActual, ticketFiltro, sucursalFiltro, tipoTrabajoFiltro, tipoServicioFiltro } = useTareasExternas()
  const { data: tareasExternas, isLoading } = useQuery(QUERY_TAREAS_EXTERNAS_ACTIVAS, fetchTareasExternasActivas)

  if (isLoading) return <Spinner animation="border" />

  if (tareasExternas) {
    // Obtengo las tareas que voy a desplegar
    var tareasFiltradas = tareasExternas.filter(tareaExterna => (
          parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE && 
          parseInt(tareaExterna.id_sucursal_destino) === parseInt(sucursalActual) &&
          (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && tareaExterna.ticket.startsWith(ticketFiltro))) &&
          (sucursalFiltro === 0 || (sucursalFiltro !== 0 && (tareaExterna.id_sucursal_origen === sucursalFiltro || tareaExterna.id_sucursal_destino === sucursalFiltro))) &&
          (tipoTrabajoFiltro === 0 || (tipoTrabajoFiltro !== 0 && tareaExterna.id_tipo_trabajo === tipoTrabajoFiltro)) &&
          (tipoServicioFiltro === 0 || (tipoServicioFiltro !== 0 && tareaExterna.id_tipo_servicio === tipoServicioFiltro)
        )))
  }

  return (
    <ListaTareasExternas
      tareasExternas={tareasFiltradas} 
      titulo='Recibidos para Atenderse'
      siguienteEstado={STATUS_TAREA.TERMINADO_PARA_RECOLECTAR}
      textoContinuar='Terminar'
      textoForward='Redireccionar'
      textoConfirmacion='¿Seguro que quieres terminar la tarea?'
    />
  )
}

export default RecibidosParaAtenderse
