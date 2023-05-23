import { useState } from 'react'
import { Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { useOlimpio } from '../../../context/OlimpioContext'
import { useConsultas } from '../../../context/ConsultasContext'
import { fechaFormatter, ticketFormatter} from '../../comun/utils'

import TareaModal from "./TareaModal"
import TareasExternasHeader from './TareasExternasHeader'

import { useQuery } from 'react-query'
import { fetchTareasPorAtenderseHoy, QUERY_TAREAS_POR_ATENDERSE_HOY } from '../../../queries/TareaExterna'

export default function TareasPorAtenderseHoy() {
    const { sucursalActual } = useOlimpio()
    const { filtros } = useConsultas()

    const { isLoading, data: tareasExternas, refetch } = useQuery(
        [QUERY_TAREAS_POR_ATENDERSE_HOY, sucursalActual], 
        fetchTareasPorAtenderseHoy
    )
    const [modalTarea, setModalTarea] = useState({mostrar: false, idTarea: 0})

    const tableRowEvents = {
        onDoubleClick: (e, row, rowIndex) => {
            setModalTarea(prevValue => ({...prevValue, idTarea: row.id_tarea_externa, mostrar: true, tipoTarea: row.tipo_tarea}))
        }
    }

    const columns = [
        { dataField: "ticket", text: "Ticket", sort: true, formatter: ticketFormatter},
        { dataField: "descripcion", text: "Descripción", sort: true },
        { dataField: "sucursal_origen", text: "Sucursal Origen", sort: true },
        { dataField: "estado_tarea", text: "Estado Actual", sort: true },
        { dataField: "tipo_trabajo", text: "Tipo de Trabajo", sort: true },
        { dataField: "tipo_servicio", text: "Tipo de Servicio", sort: true },
        { dataField: "fecha_requerida", text: "Fecha Requerida", sort: true, formatter: fechaFormatter},
    ]

    function handleRefresh() {
        refetch()
    }

    if (isLoading) return <Spinner animation="border" />

    if (tareasExternas) {
        // Obtengo las tareas que voy a desplegar
        var tareasFiltradas = tareasExternas.filter(tareaExterna => (
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

            <TareasExternasHeader titulo="Tareas por Atenderse Hoy" renglones={tareasFiltradas.length} onRefresh={handleRefresh} />

            <BootstrapTable 
                keyField="id_tarea_externa" 
                data={tareasFiltradas} 
                columns={columns} 
                striped hover condensed 
                pagination={paginationFactory()}
                rowEvents={tableRowEvents}
            />
        </>
    )
}
