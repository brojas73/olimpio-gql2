import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Row, Spinner } from 'react-bootstrap'

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
    filtraTareasExternas
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

const TareasExternasHome = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const { sucursalActual } = useOlimpio()
    const { filtros } = useTareasExternas()
    const { credenciales } = useAuth()

    // State
    const [idTareaExterna, setIdTareaExterna] = useState(0)
    const [idSucursalRedireccion, setIdSucursalRedireccion] = useState(0)
    const [tipoConfirmacion, setTipoConfirmacion] = useState(null)
  
    // Modals
    const [confirmacion, setConfirmacion] = useState({ mensaje: '', mostrar: false })
    const [modalSucursalRedireccion, setModalSucursalRedireccion] = useState({mostrar: false})

    // Queries
    const { data: tareasExternasActivas, isLoading, refetch } = useQuery(QUERY_TAREAS_EXTERNAS_ACTIVAS, fetchTareasExternasActivas)

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

    // Handlers
    function handleContinuar(idTareaExterna) {
        setIdTareaExterna(idTareaExterna)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacionTareaExterna(filtros.estado), mostrar: true}))
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
                    id_estado_tarea: getSiguienteEstadoTareaExterna(filtros.estado),
                    id_sucursal_redireccion: parseInt(idSucursalRedireccion), 
                    id_usuario: credenciales.id_usuario
                })
            }
    
            return doActualizaEstadoTareaExterna({
                id_tarea_externa: idTareaExterna, 
                id_estado_tarea: getSiguienteEstadoTareaExterna(filtros.estado),
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
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacionTareaExterna(filtros.estado), mostrar: true}))
        setTipoConfirmacion(TIPO_CONFIRMACION.RECOLECTANDO_FORWARD)
    }
    
    function handleLog(idTareaExterna) {
        navigate('/tracking/tareas-externas/bitacora-tarea-externa', {
            state: {
                id_tarea_externa: idTareaExterna
            }
        })
    }

    function handleRefresh() {
        refetch()
    }

    // Cuerpo principal del componente

    if (isLoading) return <Spinner animation="border" />

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
                        textoContinuar={getTextoContinuarTareaExterna(filtros.estado)}
                        textoBorrar={getTextoBorrarTareaExterna(filtros.estado)}
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
