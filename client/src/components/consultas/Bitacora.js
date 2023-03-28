import { useState } from 'react'

import { Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { useTareasExternas } from '../../context/TareasExternasContext'
import { fechaFormatter } from '../comun/utils'

import Filtros from "./Filtros"
import TareaExternaModal from "./TareaExternaModal"
import TituloConsultas from './TituloConsultas'

import { GET_TAREAS_EXTERNAS_LOG } from '../../queries/TareaExternaLog'
import { useQuery } from "@apollo/client"

export default function Bitacora() {
  const { sucursalActual } = useTareasExternas()
  const { data, loading } = useQuery(GET_TAREAS_EXTERNAS_LOG)

  const [modalTarea, setModalTarea] = useState({mostrar: false, idTareaExterna: 0})
  const [filtro, setFiltro] = useState({ticket: '', descripcion: ''})

  function handleChange(e) {
    setFiltro(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))
  }

  const tableRowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setModalTarea(prevValue => ({...prevValue, idTareaExterna: row.tarea_externa.id_tarea_externa, mostrar: true}))
    }
  }

  const columns = [
    { dataField: "tarea_externa.sucursal_origen.nombre", text: "Sucursal", sort: true},
    { dataField: "tarea_externa.ticket", text: "Ticket", sort: true},
    { dataField: "tarea_externa.descripcion", text: "Descripción", sort: true },
    { dataField: "tipo_accion.nombre", text: "Acción", sort: true },
    { dataField: "fecha", text: "Fecha", sort: true, formatter: fechaFormatter},
    { dataField: "usuario.nombre", text: "Usuario", sort: true },
    { dataField: "estado_tarea_fin.nombre", text: "Estado Final", sort: true },
    { dataField: "estado_tarea_ini.nombre", text: "Estado Inicial", sort: true },
  ]

  if (loading) return <Spinner animation="border" />

  if (data) {
    // Obtengo las tareas que voy a desplegar
    var tareasFiltradas = data.tareasExternasLog.filter(tareaExterna => (
          tareaExterna.tarea_externa &&
          parseInt(tareaExterna.tarea_externa.sucursal_origen.id_sucursal) === parseInt(sucursalActual) && 
          tareaExterna.tarea_externa.ticket.includes(filtro.ticket) &&
          tareaExterna.tarea_externa.descripcion.includes(filtro.descripcion)
        ))
  }

  return (
    <>
      {
        modalTarea.mostrar && (
          <TareaExternaModal 
            mostrar={modalTarea.mostrar} 
            idTareaExterna={modalTarea.idTareaExterna}
            onClose={() => setModalTarea(prevValue => ({...prevValue, mostrar: false}))} 
          />
        )
      }
      <Filtros 
        ticketFiltro={filtro.ticket} 
        descripcionFiltro={filtro.descripcion} 
        onChange={handleChange}
      />
      <TituloConsultas titulo="Bitácora de Tareas" renglones={tareasFiltradas.length} />

      <BootstrapTable 
        keyField="id_tarea_externa_log" 
        data={tareasFiltradas} 
        columns={columns} 
        striped hover condensed 
        pagination={paginationFactory()}
        rowEvents={tableRowEvents}
      />
    </>
  )
}

