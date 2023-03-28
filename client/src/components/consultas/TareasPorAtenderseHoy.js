import { useState } from 'react'
import { Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { useTareasExternas } from '../../context/TareasExternasContext'
import { fechaFormatter, ticketFormatter } from '../comun/utils'

import TareaExternaModal from "./TareaExternaModal"
import Filtros from "./Filtros"
import TituloConsultas from "./TituloConsultas"

import { GET_TAREAS_EXTERNAS_ACTIVAS_BY_DESTINO } from "../../queries/TareaExterna"
import { useQuery } from "@apollo/client"


export default function TareasPorAtenderseHoy() {
    const { sucursalActual } = useTareasExternas()
    const { data, loading } = useQuery(GET_TAREAS_EXTERNAS_ACTIVAS_BY_DESTINO, { variables: { id_sucursal: sucursalActual } })

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
        { dataField: "sucursal_origen.nombre", text: "Sucursal Origen", sort: true },
        { dataField: "tipo_trabajo.nombre", text: "Tipo de Trabajo", sort: true },
        { dataField: "tipo_servicio.nombre", text: "Tipo de Servicio", sort: true },
        { dataField: "fecha_requerida", text: "Fecha Requerida", sort: true, formatter: fechaFormatter},
    ]

    if (loading) return <Spinner animation="border" />

    if (data) {
        // Obtengo las tareas que voy a desplegar
        var tareasFiltradas = data.tareasExternasActivasByDestino.filter(tareaExterna => (
            parseInt(tareaExterna.sucursal_destino.id_sucursal) === parseInt(sucursalActual) &&
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
