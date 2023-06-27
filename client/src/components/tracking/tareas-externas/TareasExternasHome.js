import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

// Hooks
import { useAuth } from "../../../hooks/useAuth"
import { useOlimpio } from '../../../context/OlimpioContext'
import { useTareasExternas } from "../../../context/TareasExternasContext"

// Utils
import { 
    getSiguienteEstadoTareaExterna,
    getTituloTareaExterna,
    getTextoConfirmacionTareaExterna,
    getTextoBorrarTareaExterna,
    getTextoForwardTareaExterna,
    getTextoContinuarTareaExterna,
    filtraTareasExternas,
    esRedireccionadaAMaquila,
    getTextoConfirmacionBorrarTareaExterna
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
import RedireccionaSucursalModal from "../../comun/RedireccionaSucursalModal"
import { STATUS_TAREA_LOCAL } from '../../../context/TareasLocalesContext'

// Constantes
const TIPO_CONFIRMACION = {
    BORRANDO: 0,
    RECOLECTANDO_FORWARD: 1
} 

const TareasExternasHome = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const { sucursalActual } = useOlimpio()
    const { filtros } = useTareasExternas()
    const { credenciales } = useAuth()

    // State
    const [tareaExterna, setTareaExterna] = useState(0)
    const [idSucursalRedireccion, setIdSucursalRedireccion] = useState(0)
    const [tipoConfirmacion, setTipoConfirmacion] = useState(null)
  
    // Modals
    const [confirmacion, setConfirmacion] = useState({ mensaje: '', mostrar: false })
    const [modalSucursalRedireccion, setModalSucursalRedireccion] = useState({mostrar: false})
    
    // Queries
    const { data: tareasExternasActivas, isLoading, isError, refetch } = useQuery({
        queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS], 
        queryFn: fetchTareasExternasActivas,
        onError: (err) => {
            toast.error(err.message)
        }
    })

    // Mutations
    const { mutate: doBorraTareaExterna } = useMutation ({
        mutationFn: borraTareaExterna,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
        // onSuccess: (data) => {
        //     queryClient.setQueriesData(QUERY_TAREAS_EXTERNAS_ACTIVAS, (current) => (
        //         current.filter(tareaExterna => (parseInt(tareaExterna.id_tarea_externa) !== parseInt(data.id_tarea_externa)))
        //     ))
        // }
    })

    const { mutate: doActualizaEstadoTareaExterna } = useMutation ({
        mutationFn: actualizaEstadoTareaExterna,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
        // onSuccess: ({data}) => {
        //     queryClient.setQueriesData(QUERY_TAREAS_EXTERNAS_ACTIVAS, (current) => (
        //         current.map(tareaExterna => (
        //             parseInt(tareaExterna.id_tarea_externa) === parseInt(data.id_tarea_externa) ? 
        //                 {...tareaExterna, id_estado_tarea: data.id_estado_tarea} : 
        //                 tareaExterna 
        //         ))
        //     ))
        // }
    })
    
    const { mutate: doRedireccionaTareaExterna } = useMutation ({
        mutationFn: redireccionaTareaExterna,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    
    const { mutate: doRecolectaTareaExternaForwarded } = useMutation ({
        mutationFn: recolectaTareaExternaForwarded,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_TAREAS_EXTERNAS_ACTIVAS] })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    // Handlers
    function handleConfirmacion(confirmado) {
        // Cierro la modal
        setConfirmacion(prevValue => ({...prevValue, mostrar: false}))
    
        // Si dieron confirmar en la modal
        if (confirmado) {
            if (parseInt(tipoConfirmacion) === TIPO_CONFIRMACION.BORRANDO) {
                setTipoConfirmacion(null)
                return doBorraTareaExterna({
                    id_tarea_externa: tareaExterna.id_tarea_externa, 
                    id_tarea_local: tareaExterna.id_tarea_local,
                    id_usuario: credenciales.id_usuario,
                    id_estado_tarea: STATUS_TAREA_LOCAL.POR_ATENDERSE       // Este valor lo utilizamos sólo para las cancelaciones de las redirecciones de tareas locales
                })
            } 
    
            if (parseInt(tipoConfirmacion) === TIPO_CONFIRMACION.RECOLECTANDO_FORWARD) {
                setTipoConfirmacion(null)
                return doRecolectaTareaExternaForwarded({
                    id_tarea_externa: tareaExterna.id_tarea_externa, 
                    id_estado_tarea: getSiguienteEstadoTareaExterna(filtros.estado, esRedireccionadaAMaquila(tareaExterna)),
                    id_sucursal_redireccion: parseInt(idSucursalRedireccion), 
                    id_usuario: credenciales.id_usuario
                })
            }
    
            // Confirmaron el cambio de estado de la tarea externa
            return doActualizaEstadoTareaExterna({
                id_tarea_externa: tareaExterna.id_tarea_externa, 
                id_estado_tarea: getSiguienteEstadoTareaExterna(filtros.estado, esRedireccionadaAMaquila(tareaExterna)),
                id_usuario: credenciales.id_usuario
            })
        }
    }

    function handleContinuar(tareaExterna) {
        setTareaExterna(tareaExterna)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacionTareaExterna(filtros.estado, esRedireccionadaAMaquila(tareaExterna)), mostrar: true}))
    }

    function handleBorrar(tareaExterna) {
        setTareaExterna(tareaExterna)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacionBorrarTareaExterna(tareaExterna, filtros.estado), mostrar: true}))
        setTipoConfirmacion(TIPO_CONFIRMACION.BORRANDO)
    }
    
    function handleForward(tareaExterna) {
        setTareaExterna(tareaExterna)
        setModalSucursalRedireccion(prevValue => ({...prevValue, mostrar: true}))
    }
    
    function handleLog(tareaExterna) {
        navigate('/tracking/tareas-externas/bitacora-tarea-externa', {
            state: {
                id_tarea_externa: tareaExterna.id_tarea_externa
            }
        })
    }

    function handleRecolectarForwarded(tareaExterna, idSucursalRedireccion) {
        setTareaExterna(tareaExterna)
        setIdSucursalRedireccion(idSucursalRedireccion)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacionTareaExterna(filtros.estado, esRedireccionadaAMaquila(tareaExterna)), mostrar: true}))
        setTipoConfirmacion(TIPO_CONFIRMACION.RECOLECTANDO_FORWARD)
    }
    
    function handleConfirmarForward(confirmado, idSucursalRedireccion) {
        // Cierro la modal
        setModalSucursalRedireccion(prevValue => ({...prevValue, mostrar: false}))

        // Si dieron confirmar en la modal
        if (confirmado) {
            return doRedireccionaTareaExterna({
                id_tarea_externa: tareaExterna.id_tarea_externa, 
                id_sucursal_redireccion: parseInt(idSucursalRedireccion), 
                id_usuario: credenciales.id_usuario
            })
        }
    }
    
    function handleRefresh() {
        refetch()
    }

    // Cuerpo principal del componente

    if (isLoading) return <Spinner animation="border" />

    if (isError) return "Error"

    if (tareasExternasActivas) {
      // Obtengo las tareas que voy a desplegar
      var tareasExternas = filtraTareasExternas(tareasExternasActivas, filtros, sucursalActual)
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
                title="Desvío de Tarea Externa"
            />
    
            <TareasExternasHeader 
                titulo={getTituloTareaExterna(filtros.estado)} 
                renglones={tareasExternas.length}
                onRefresh={handleRefresh}
            />

            <Row xs={1} md={1} lg={2} className="g-3">
            {
                tareasExternas.map(tareaExterna => (
                    <TareaExterna 
                        tareaExterna={tareaExterna} 
                        textoContinuar={getTextoContinuarTareaExterna(filtros.estado, esRedireccionadaAMaquila(tareaExterna))}
                        textoBorrar={getTextoBorrarTareaExterna(tareaExterna, filtros.estado)}
                        textoForward={getTextoForwardTareaExterna(filtros.estado)}
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
