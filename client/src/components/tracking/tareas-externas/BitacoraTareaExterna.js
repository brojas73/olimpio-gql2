import { useLocation, useNavigate } from "react-router-dom"

import { Button, Spinner } from "react-bootstrap"

import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { fechaFormatter, TAMANO_CONTROLES } from '../../comun/utils'

import { useQuery } from 'react-query'
import { fetchTareasExternasLogByTareaExterna, QUERY_TAREAS_EXTERNAS_LOG_BY_TAREA_EXTERNA } from '../../../queries/TareaExternaLog'

import TituloTareas from './TituloTareas'

export default function BitacoraTareaExterna() {
  const location = useLocation()
  const navigate = useNavigate()
  const idTareaExterna = location.state.id_tarea_externa

  const { data: tareasExternasLog, error, isLoading } = useQuery({
    queryKey: [QUERY_TAREAS_EXTERNAS_LOG_BY_TAREA_EXTERNA, idTareaExterna], 
    queryFn: fetchTareasExternasLogByTareaExterna,
    retry: false
  })


  const columns = [
    { dataField: "tipo_accion", text: "Acción", sort: true },
    { dataField: "fecha", text: "Fecha", sort: true, formatter: fechaFormatter},
    { dataField: "usuario", text: "Usuario", sort: true },
    { dataField: "estado_ini", text: "Estado Inicial", sort: true },
    { dataField: "estado_fin", text: "Estado Final", sort: true },
  ]

  if (isLoading) return <Spinner animation="border" />

  if (error) return <span>{error.message}</span>

  return (
    <>
      <TituloTareas titulo="Bitácora de Tarea Externa" renglones={tareasExternasLog.length} />

      <BootstrapTable 
        keyField="id" 
        data={tareasExternasLog} 
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

