import { useLocation, useNavigate } from "react-router-dom"

import { Button, Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { fechaFormatter, TAMANO_CONTROLES } from '../../comun/utils'

import { useQuery } from 'react-query'
import { fetchServiciosDomicilioLogByServicioDomicilio, QUERY_SERVICIOS_DOMICILIO_LOG_BY_SERVICIO_DOMICILIO } from '../../../queries/ServicioDomicilioLog'

import TituloServicioDomicilio from './TituloServicioDomicilio'

export default function BitacoraServicioDomicilio() {
  const location = useLocation()
  const navigate = useNavigate()
  const idServicioDomicilio = location.state.id_servicio_domicilio

  const {isLoading, data: serviciosDomicilioLog} = useQuery(
    [QUERY_SERVICIOS_DOMICILIO_LOG_BY_SERVICIO_DOMICILIO, idServicioDomicilio],
    fetchServiciosDomicilioLogByServicioDomicilio
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
      <TituloServicioDomicilio titulo="Bitácora de Servicio a Domicilio" renglones={serviciosDomicilioLog.length} />

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
        size={TAMANO_CONTROLES}
      >
         Regresar
      </Button>
    </>
  )
}

