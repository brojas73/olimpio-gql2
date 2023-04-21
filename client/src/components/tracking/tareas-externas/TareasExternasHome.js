import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Row, Spinner } from 'react-bootstrap'

// Hooks
import { useAuth } from "../../../hooks/useAuth"
import { useTareasExternas, STATUS_TAREA } from "../../../context/TareasExternasContext"

// Utils
import { 
    esPendienteDeRecoleccion, 
    esRedireccionada, 
    origenEnSucursalActual, 
    destinoEnSucursalActual
} from "../../comun/utils"

// Queries 
import { useQuery } from "react-query"
import { 
    QUERY_TAREAS_EXTERNAS_ACTIVAS ,
    fetchTareasExternasActivas
} from "../../../queries/TareaExterna"

// Mutations
import { useMutation, useQueryClient } from "react-query"
import { 
    actualizaEstadoTareaExterna, 
    borraTareaExterna, 
    redireccionaTareaExterna, 
    recolectaTareaExternaForwarded 
} from "../../../mutations/TareaExterna"

// Components
import TareasExternasHeader from "./TareasExternasHeader"
import TareaExterna from "./TareaExternaCard"
import ConfirmacionModal from '../../comun/ConfirmacionModal'
import RedireccionaSucursalModal from "./RedireccionaSucursalModal"

// Constantes
const TIPO_CONFIRMACION = {
    BORRANDO: 0,
    RECOLECTANDO_FORWARD: 1
} 

// Funciones helpers
function getSiguienteEstado(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_TAREA.PENDIENTE_RECOLECCION:
        case STATUS_TAREA.REDIRECCIONADO:
                return STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE
        case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
                return STATUS_TAREA.RECIBIDO_PARA_ATENDERSE
        case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
            return STATUS_TAREA.TERMINADO_PARA_RECOLECTAR
        case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
            return STATUS_TAREA.RECOLECTADO_PARA_ENTREGA
        case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
            return STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN
        case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
            return STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN
        default:
            return null
    }
}

export function getTitulo(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_TAREA.TAREAS_ACTIVAS:
            return 'Tareas Activas'
        case STATUS_TAREA.PENDIENTE_RECOLECCION:
            return 'Pendiente de Recolección'
        case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
            return 'Recolectadas para Atenderse'
        case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
            return 'Recibidas para Atenderse'
        case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
            return 'Terminadas para Recolectar'
        case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
            return 'Recolectadas para Entrega'
        case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
            return 'Entregadas a Sucursal Origen'
        default:
            return 'Desconocido'
    }
}

function getTextoConfirmacion(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_TAREA.PENDIENTE_RECOLECCION:
            return '¿Seguro que quieres recolectar la tarea?'
        case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
            return '¿Seguro que quieres recibir la tarea?'
        case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
            return '¿Seguro que quieres terminar la tarea?'
        case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
            return '¿Seguro que quieres recolectar la tarea?'
        case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
            return '¿Seguro que quieres entregar la tarea?'
        case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
            return '¿Seguro que quieres recibir la tarea?'
        default:
            return 'Desconocido'
    }
}

function getTextoContinuar(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_TAREA.PENDIENTE_RECOLECCION:
            return 'Recolectar'
        case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
            return 'Recibir'
        case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
            return 'Terminar'
        case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
            return 'Recolectar'
        case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
            return 'Entregar'
        case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
            return 'Recibir'
        default:
            return 'Desconocido'
    }
}

function getTextoBorrar(idEstadoActual) {
    return (parseInt(idEstadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION) ? 'Borrar' : null 
}

function getTextoForward(idEstadoActual) {
    return (parseInt(idEstadoActual) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE) ? 'Desviar' : null 
}

const TareasExternasHome = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const { sucursalActual, estadoActual, ticketFiltro, sucursalFiltro } = useTareasExternas()
    const { credenciales } = useAuth()

    // State
    const [idTareaExterna, setIdTareaExterna] = useState(0)
    const [idSucursalRedireccion, setIdSucursalRedireccion] = useState(0)
    const [tipoConfirmacion, setTipoConfirmacion] = useState(null)
  
    // Modals
    const [confirmacion, setConfirmacion] = useState({ mensaje: '', mostrar: false })
    const [modalSucursalRedireccion, setModalSucursalRedireccion] = useState({mostrar: false})

    // Queries
    const { data: tareasExternasActivas, isLoading } = useQuery(QUERY_TAREAS_EXTERNAS_ACTIVAS, fetchTareasExternasActivas)

    // Mutations
    const { mutate: doBorraTareaExterna } = useMutation ({
        mutationFn: borraTareaExterna,
        onSuccess: ({id_tarea_externa}) => {
            queryClient.setQueriesData(QUERY_TAREAS_EXTERNAS_ACTIVAS, (current) => (
                current.filter(tareaExterna => (parseInt(tareaExterna.id_tarea_externa) !== parseInt(id_tarea_externa)))
            ))
        }
    })

    const { mutate: doActualizaEstadoTareaExterna } = useMutation ({
        mutationFn: actualizaEstadoTareaExterna,
        onSuccess: ({data}) => {
            queryClient.setQueriesData(QUERY_TAREAS_EXTERNAS_ACTIVAS, (current) => (
                current.map(tareaExterna => (
                    parseInt(tareaExterna.id_tarea_externa) === parseInt(data.id_tarea_externa) ? 
                        {...tareaExterna, id_estado_tarea: data.id_estado_tarea} : 
                        tareaExterna 
                ))
            ))
        }
    })
    
    const { mutate: doRedireccionaTareaExterna } = useMutation ({
        mutationFn: redireccionaTareaExterna,
        onSuccess: ({data}) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS] })
        }
    })
    
    const { mutate: doRecolectaTareaExternaForwarded } = useMutation ({
        mutationFn: recolectaTareaExternaForwarded,
        onSuccess: ({data}) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS] })
        }
    })

    // Funciones
    function filtraTareas(tareasExternasActivas) {
        const tareasExternasFiltradas = tareasExternasActivas.filter(tareaExterna => 
            (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && tareaExterna.ticket.includes(ticketFiltro))) &&
            (sucursalFiltro === 0 || (sucursalFiltro !== 0 && (tareaExterna.id_sucursal_origen === sucursalFiltro || tareaExterna.id_sucursal_destino === sucursalFiltro)))
        )

        switch (parseInt(estadoActual)) {
            case STATUS_TAREA.PENDIENTE_RECOLECCION:
            case STATUS_TAREA.REDIRECCIONADO:
                return tareasExternasFiltradas.filter(tareaExterna => (
                    (esPendienteDeRecoleccion(tareaExterna) && origenEnSucursalActual(tareaExterna, sucursalActual)) || 
                    (esRedireccionada(tareaExterna) && destinoEnSucursalActual(tareaExterna, sucursalActual)) 
                ))
            case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
                return tareasExternasFiltradas.filter(tareaExterna => (
                    parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE &&
                    parseInt(tareaExterna.id_sucursal_destino) === parseInt(sucursalActual)  
                ))
            case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
                return tareasExternasFiltradas.filter(tareaExterna => (
                    parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE && 
                    parseInt(tareaExterna.id_sucursal_destino) === parseInt(sucursalActual)
                ))
            case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
                return tareasExternasFiltradas.filter(tareaExterna => (
                    parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.TERMINADO_PARA_RECOLECTAR &&
                    parseInt(tareaExterna.id_sucursal_destino) === parseInt(sucursalActual) 
                ))
            case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
                return tareasExternasFiltradas.filter(tareaExterna => (
                    parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.RECOLECTADO_PARA_ENTREGA &&
                    parseInt(tareaExterna.id_sucursal_origen) === parseInt(sucursalActual) 
                ))
            case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
                return tareasExternasFiltradas.filter(tareaExterna => (
                    parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN &&
                    parseInt(tareaExterna.id_sucursal_origen) === parseInt(sucursalActual) 
                ))
            default:
                return tareasExternasFiltradas
        }
    }
        
    // Handlers
    function handleContinuar(idTareaExterna) {
        setIdTareaExterna(idTareaExterna)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacion(estadoActual), mostrar: true}))
    }

    function handleConfirmacion(confirmado) {
        // Cierro la modal
        setConfirmacion(prevValue => ({...prevValue, mostrar: false}))
    
        // Si dieron confirmar en la modal
        if (confirmado) {
            if (parseInt(tipoConfirmacion) === TIPO_CONFIRMACION.BORRANDO) {
                setTipoConfirmacion(null)
                return doBorraTareaExterna({id_tarea_externa: idTareaExterna})
            } 
    
            if (parseInt(tipoConfirmacion) === TIPO_CONFIRMACION.RECOLECTANDO_FORWARD) {
                setTipoConfirmacion(null)
                return doRecolectaTareaExternaForwarded({
                    id_tarea_externa: idTareaExterna, 
                    id_estado_tarea: getSiguienteEstado(estadoActual),
                    id_sucursal_redireccion: parseInt(idSucursalRedireccion), 
                    id_usuario: credenciales.id_usuario
                })
            }
    
            return doActualizaEstadoTareaExterna({
                id_tarea_externa: idTareaExterna, 
                id_estado_tarea: getSiguienteEstado(estadoActual),
                id_usuario: credenciales.id_usuario
            })
        }
    }

    function handleBorrar(idTareaExterna) {
        setIdTareaExterna(idTareaExterna)
        setConfirmacion(prevValue => ({...prevValue, mensaje: '¿Seguro que quieres borrar la tarea?', mostrar: true}))
        setTipoConfirmacion(TIPO_CONFIRMACION.BORRANDO)
    }
    
    function handleForward(idTareaExterna) {
        setIdTareaExterna(idTareaExterna)
        setModalSucursalRedireccion(prevValue => ({...prevValue, mostrar: true}))
    }
    
    function handleConfirmarForward(confirmado, idSucursalRedireccion) {
        // Cierro la modal
        setModalSucursalRedireccion(prevValue => ({...prevValue, mostrar: false}))

        // Si dieron confirmar en la modal
        if (confirmado) {
            return doRedireccionaTareaExterna({
                id_tarea_externa: idTareaExterna, 
                id_sucursal_redireccion: parseInt(idSucursalRedireccion), 
                id_usuario: credenciales.id_usuario
            })
        }
    }
    
    function handleRecolectarForwarded(idTareaExterna, idSucursalRedireccion) {
        setIdTareaExterna(idTareaExterna)
        setIdSucursalRedireccion(idSucursalRedireccion)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacion(estadoActual), mostrar: true}))
        setTipoConfirmacion(TIPO_CONFIRMACION.RECOLECTANDO_FORWARD)
    }
    
    function handleLog(idTareaExterna) {
        navigate('/tracking/tareas-externas/bitacora-tarea-externa', {
            state: {
                id_tarea_externa: idTareaExterna
            }
        })
    }

    // Cuerpo principal del componente

    if (isLoading) return <Spinner animation="border" />

    if (tareasExternasActivas) {
      // Obtengo las tareas que voy a desplegar
      var tareasExternas = filtraTareas(tareasExternasActivas)
    }
  
    return (
        <>
            <ConfirmacionModal 
                mostrar={confirmacion.mostrar} 
                titulo='Confirmación' 
                mensaje={confirmacion.mensaje}
                onConfirmar={handleConfirmacion}
            />
    
            <RedireccionaSucursalModal 
                mostrar={modalSucursalRedireccion.mostrar}
                onConfirmar={handleConfirmarForward}
            />
    
            <TareasExternasHeader 
                titulo={getTitulo(estadoActual)} 
                renglones={tareasExternas.length}
            />

            <Row xs={1} md={1} lg={2} className="g-3">
            {
                tareasExternas.map(tareaExterna => (
                    <TareaExterna 
                        tareaExterna={tareaExterna} 
                        textoContinuar={getTextoContinuar(estadoActual)}
                        textoBorrar={getTextoBorrar(estadoActual)}
                        textoForward={getTextoForward(estadoActual)}
                        onContinuar={handleContinuar}
                        onBorrar={handleBorrar}
                        onForward={handleForward}
                        onLog={handleLog}
                        onRecolectarForwarded={handleRecolectarForwarded}
                        key={tareaExterna.id_tarea_externa} 
                    />
                ))
            }
            </Row>
        </>
      )
}

export default TareasExternasHome
