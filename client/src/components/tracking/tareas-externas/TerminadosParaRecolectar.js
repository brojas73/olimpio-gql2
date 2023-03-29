import { Spinner } from "react-bootstrap"

import { STATUS_TAREA, useTareasExternas } from "../../../context/TareasExternasContext"

import { useQuery } from "react-query"
import { fetchTareasExternasActivas } from "../../../queries/TareaExterna"

import ListaTareasExternas from "./ListaTareasExternas"

const TerminadosParaRecolectar = () => {
  const { sucursalActual, ticketFiltro, sucursalFiltro, tipoTrabajoFiltro, tipoServicioFiltro } = useTareasExternas()
  const { data: tareasExternas, isLoading } = useQuery('tareasExternasActivas', fetchTareasExternasActivas)

  if (isLoading) return <Spinner animation="border" />

  if (tareasExternas) {
    // Obtengo las tareas que voy a desplegar
    var tareasFiltradas = tareasExternas.filter(tareaExterna => (
          parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.TERMINADO_PARA_RECOLECTAR &&
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
      titulo='Terminados para Recolectar'
      siguienteEstado={STATUS_TAREA.RECOLECTADO_PARA_ENTREGA}
      textoContinuar='Recolectar'
      textoConfirmacion='¿Seguro que quieres recolectar la tarea?'
    />
  )
}

export default TerminadosParaRecolectar
