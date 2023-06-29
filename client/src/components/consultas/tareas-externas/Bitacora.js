import { useState } from 'react'

import { Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { useOlimpio } from '../../../context/OlimpioContext'
import { useConsultas } from '../../../context/ConsultasContext'
import { fechaFormatter } from '../../comun/utils'

import { useQuery } from 'react-query'
import { fetchTareasExternasLog, QUERY_TAREAS_EXTERNAS_LOG } from '../../../queries/TareaExternaLog'

import TareaModal from "./TareaModal"
import TareasExternasHeader from './TareasExternasHeader'

export default function Bitacora() {
  const { sucursalActual } = useOlimpio()
  const { filtros } = useConsultas()

  const {isLoading, data: tareasExternasLog, error, refetch} = useQuery({
    queryKey: [QUERY_TAREAS_EXTERNAS_LOG], 
    queryFn: fetchTareasExternasLog,
    retry: false
  })
  const [modalTarea, setModalTarea] = useState({mostrar: false, idTarea: 0, tipoTarea: 'E'})

  const tableRowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setModalTarea(prevValue => ({...prevValue, idTarea: row.id_tarea_externa, mostrar: true, tipoTarea: row.tipo_tarea}))
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

  function handleRefresh() {
    refetch()
  }

  if (isLoading) return <Spinner animation="border" />

  if (error) return <span>{error.message}</span>

  if (tareasExternasLog) {
    // Obtengo las tareas que voy a desplegar
    var tareasFiltradas = tareasExternasLog.filter(tareaExterna => (
          parseInt(tareaExterna.id_sucursal_origen) === parseInt(sucursalActual) &&
          tareaExterna.ticket.includes(filtros.ticket) &&
          tareaExterna.descripcion.includes(filtros.descripcion)
        ))
  }

  return (
    <>
      {
        modalTarea.mostrar && (
          <TareaModal 
            mostrar={modalTarea.mostrar} 
            idTarea={modalTarea.idTarea}
            tipoTarea={modalTarea.tipoTarea}
            onClose={() => setModalTarea(prevValue => ({...prevValue, mostrar: false}))} 
          />
        )
      }
      <TareasExternasHeader titulo="Bitácora de Tareas" renglones={tareasFiltradas.length} onRefresh={handleRefresh}/>

      <BootstrapTable 
        keyField="id" 
        data={tareasFiltradas} 
        columns={columns} 
        striped hover condensed 
        pagination={paginationFactory()}
        rowEvents={tableRowEvents}
      />
    </>
  )
}

