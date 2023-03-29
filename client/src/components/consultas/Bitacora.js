import { useState } from 'react'

import { Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { useTareasExternas } from '../../context/TareasExternasContext'
import { fechaFormatter } from '../comun/utils'

import { useQuery } from 'react-query'
import { fetchTareasExternasLog } from '../../queries/TareaExternaLog'

import Filtros from "./Filtros"
import TareaExternaModal from "./TareaExternaModal"
import TituloConsultas from './TituloConsultas'

export default function Bitacora() {
  const { sucursalActual } = useTareasExternas()

  const {isLoading, data: tareasExternasLog} = useQuery('tareasExternasLog', fetchTareasExternasLog)

  const [modalTarea, setModalTarea] = useState({mostrar: false, idTareaExterna: 0})
  const [filtro, setFiltro] = useState({ticket: '', descripcion: ''})

  function handleChange(e) {
    setFiltro(prevValue => ({...prevValue, [e.target.name]: e.target.value.toUpperCase()}))
  }

  const tableRowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setModalTarea(prevValue => ({...prevValue, idTareaExterna: row.id_tarea_externa, mostrar: true}))
    }
  }

  const columns = [
    { dataField: "sucursal_origen", text: "Sucursal", sort: true},
    { dataField: "ticket", text: "Ticket", sort: true},
    { dataField: "descripcion", text: "Descripción", sort: true },
    { dataField: "tipo_accion", text: "Acción", sort: true },
    { dataField: "fecha", text: "Fecha", sort: true, formatter: fechaFormatter},
    { dataField: "usuario", text: "Usuario", sort: true },
    { dataField: "estado_fin", text: "Estado Final", sort: true },
    { dataField: "estado_ini", text: "Estado Inicial", sort: true },
  ]

  if (isLoading) return <Spinner animation="border" />

  if (tareasExternasLog) {
    // Obtengo las tareas que voy a desplegar
    var tareasFiltradas = tareasExternasLog.filter(tareaExterna => (
          parseInt(tareaExterna.id_sucursal_origen) === parseInt(sucursalActual) &&
          tareaExterna.ticket.includes(filtro.ticket) &&
          tareaExterna.descripcion.includes(filtro.descripcion)
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

