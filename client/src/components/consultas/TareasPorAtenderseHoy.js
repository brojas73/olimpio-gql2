import { useEffect, useState } from 'react'
import { Spinner } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator'

import { useTareasExternas } from '../../context/TareasExternasContext'
import { fechaFormatter, ticketFormatter, fetchData, URL_APIS_DEV, URL_APIS_PROD } from '../comun/utils'

import TareaExternaModal from "./TareaExternaModal"
import Filtros from "./Filtros"
import TituloConsultas from "./TituloConsultas"

export default function TareasPorAtenderseHoy() {
    const [tareas, setTareas] = useState([])
    const [loading, setLoading] = useState(true)
    const { sucursalActual } = useTareasExternas()

    const [modalTarea, setModalTarea] = useState({mostrar: false, idTareaExterna: 0})
    const [filtro, setFiltro] = useState({ticket: '', descripcion: ''})

    useEffect(() => {
        async function fetchTareas () {
            const url_api = process.env.NODE_ENV === 'development' ? URL_APIS_DEV : URL_APIS_PROD 
            await fetchData(`${url_api}/tareas-por-atenderse-hoy/${sucursalActual}`)
                  .then(data => {
                    setTareas([...data])
                  })
                  .finally(setLoading(false)) 
        }
    
        fetchTareas()
    }, [sucursalActual])

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
        { dataField: "tipo_trabajo", text: "Tipo de Trabajo", sort: true },
        { dataField: "tipo_servicio", text: "Tipo de Servicio", sort: true },
        { dataField: "fecha_requerida", text: "Fecha Requerida", sort: true, formatter: fechaFormatter},
    ]

    if (loading) return <Spinner animation="border" />

    if (tareas) {
        // Obtengo las tareas que voy a desplegar
        var tareasFiltradas = tareas.filter(tareaExterna => (
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
