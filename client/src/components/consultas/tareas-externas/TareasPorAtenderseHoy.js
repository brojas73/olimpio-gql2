import { useState } from 'react'
import { Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { useTareasExternas } from '../../../context/TareasExternasContext'
import { fechaFormatter, ticketFormatter} from '../../comun/utils'

import TareaExternaModal from "./TareaExternaModal"
import Filtros from "./Filtros"
import TituloConsultas from "./TituloConsultas"

import { useQuery } from 'react-query'
import { fetchTareasPorAtenderseHoy, QUERY_TAREAS_POR_ATENDERSE_HOY } from '../../../queries/TareaExterna'

export default function TareasPorAtenderseHoy() {
    const { sucursalActual } = useTareasExternas()

    // const { isLoading, data: tareasExternas } = useQuery(['tareasPorAtenderseHoy', sucursalActual], () => fetchTareasPorAtenderseHoy(sucursalActual))
    const { isLoading, data: tareasExternas } = useQuery(QUERY_TAREAS_POR_ATENDERSE_HOY, () => fetchTareasPorAtenderseHoy(sucursalActual))

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
        { dataField: "ticket", text: "Ticket", sort: true, formatter: ticketFormatter},
        { dataField: "descripcion", text: "Descripción", sort: true },
        { dataField: "sucursal_origen", text: "Sucursal Origen", sort: true },
        { dataField: "estado_tarea", text: "Estado Actual", sort: true },
        { dataField: "tipo_trabajo", text: "Tipo de Trabajo", sort: true },
        { dataField: "tipo_servicio", text: "Tipo de Servicio", sort: true },
        { dataField: "fecha_requerida", text: "Fecha Requerida", sort: true, formatter: fechaFormatter},
    ]

    if (isLoading) return <Spinner animation="border" />

    if (tareasExternas) {
        // Obtengo las tareas que voy a desplegar
        var tareasFiltradas = tareasExternas.filter(tareaExterna => (
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
        <TituloConsultas titulo="Tareas por Atenderse Hoy" renglones={tareasFiltradas.length} />

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
