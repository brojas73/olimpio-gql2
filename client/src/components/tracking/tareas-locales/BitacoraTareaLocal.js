import { useLocation, useNavigate } from "react-router-dom"

import { Button, Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { fechaFormatter, TAMANO_CONTROLES } from '../../comun/utils'

import { useQuery } from 'react-query'
import { fetchTareasLocalesLogByTareaLocal, QUERY_TAREAS_LOCALES_LOG_BY_TAREA_LOCAL } from '../../../queries/TareaLocalLog'

import TituloTareas from './TituloTareas'

export default function BitacoraTareaLocal() {
  const location = useLocation()
  const navigate = useNavigate()
  const idTareaLocal = location.state.id_tarea_local

  const {isLoading, data: tareasLocalesLog} = useQuery(
    [QUERY_TAREAS_LOCALES_LOG_BY_TAREA_LOCAL, idTareaLocal],  
    fetchTareasLocalesLogByTareaLocal
  )

  const columns = [
    { dataField: "tipo_accion", text: "Acción", sort: true },
    { dataField: "fecha", text: "Fecha", sort: true, formatter: fechaFormatter},
    { dataField: "usuario", text: "Usuario", sort: true },
    { dataField: "estado_ini", text: "Estado Inicial", sort: true },
    { dataField: "estado_fin", text: "Estado Final", sort: true },
  ]

  if (isLoading) return <Spinner animation="border" />

  return (
    <>
      <TituloTareas titulo="Bitácora de Tarea Local" renglones={tareasLocalesLog.length} />

      <BootstrapTable 
        keyField="id" 
        data={tareasLocalesLog} 
        columns={columns} 
        striped hover condensed 
        pagination={paginationFactory()}
      />

      <Button 
        onClick={() => navigate(-1)}
        variant='secondary'
        size={TAMANO_CONTROLES}
      >
         Regresar
      </Button>
    </>
  )
}

