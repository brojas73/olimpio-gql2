import { useLocation, useNavigate } from "react-router-dom"

import { Button, Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { fechaFormatter } from '../../comun/utils'

import { useQuery } from 'react-query'
import { fetchTareasExternasLogByTareaExterna, QUERY_TAREAS_EXTERNAS_LOG_BY_TAREA_EXTERNA } from '../../../queries/ServicioDomiclioLog'

import TituloTareas from './TituloTareas'

export default function BitacoraServicioDomicilio() {
  const location = useLocation()
  const navigate = useNavigate()
  const idServicioDomicilio = location.state.id_servicio_domicilio

  const {isLoading, data: serviciosDomicilioLog} = useQuery(QUERY_TAREAS_EXTERNAS_LOG_BY_TAREA_EXTERNA, 
    () => fetchTareasExternasLogByTareaExterna(idServicioDomicilio)
  )

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

  return (
    <>
      <TituloTareas titulo="Bitácora de Servicio a Domicilio" renglones={serviciosDomicilioLog.length} />

      <BootstrapTable 
        keyField="id" 
        data={serviciosDomicilioLog} 
        columns={columns} 
        striped hover condensed 
        pagination={paginationFactory()}
      />

      <Button 
        onClick={() => navigate(-1)}
        variant='secondary'
      >
         Regresar
      </Button>
    </>
  )
}

