import { Spinner } from "react-bootstrap"

import { STATUS_TAREA, useTareasExternas } from "../../context/TareasExternasContext"

import { useQuery } from "@apollo/client"
import { GET_TAREAS_EXTERNAS_ACTIVAS } from "../../queries/TareaExterna"

import ListaTareasExternas from "./ListaTareasExternas"

const RecibidosParaAtenderse = () => {
  const { sucursalActual, ticketFiltro, sucursalFiltro, tipoTrabajoFiltro, tipoServicioFiltro } = useTareasExternas()
  const { data: tareasExternas, loading } = useQuery(GET_TAREAS_EXTERNAS_ACTIVAS)

  if (loading) return <Spinner animation="border" />

  if (tareasExternas) {
    // Obtengo las tareas que voy a desplegar
    var tareasFiltradas = tareasExternas.tareasExternasActivas.filter(tareaExterna => (
          parseInt(tareaExterna.estado_tarea.id_estado_tarea) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE &&
          parseInt(tareaExterna.sucursal_destino.id_sucursal) === parseInt(sucursalActual) &&  
          (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && tareaExterna.ticket.startsWith(ticketFiltro))) &&
          (sucursalFiltro === 0 || (sucursalFiltro !== 0 && (tareaExterna.sucursal_origen.id_sucursal === sucursalFiltro || tareaExterna.sucursal_destino.id_sucursal === sucursalFiltro))) &&
          (tipoTrabajoFiltro === 0 || (tipoTrabajoFiltro !== 0 && tareaExterna.tipo_trabajo.id_tipo_trabajo === tipoTrabajoFiltro)) &&
          (tipoServicioFiltro === 0 || (tipoServicioFiltro !== 0 && tareaExterna.tipo_servicio.id_tipo_servicio === tipoServicioFiltro)
        )))
  }

  return (
    <ListaTareasExternas
      tareasExternas={tareasFiltradas} 
      titulo='Recibidos para Atenderse'
      siguienteEstado={STATUS_TAREA.TERMINADO_PARA_RECOLECTAR}
      textoContinuar='Terminar'
      textoConfirmacion='¿Seguro que quieres terminar la tarea?'
    />
  )
}

export default RecibidosParaAtenderse
