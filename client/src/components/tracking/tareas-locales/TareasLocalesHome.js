import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Row, Spinner } from 'react-bootstrap'

// Hooks
import { useAuth } from "../../../hooks/useAuth"
import { useOlimpio } from '../../../context/OlimpioContext'
import { useTareasLocales } from "../../../context/TareasLocalesContext"

// Utils
import { 
    getSiguienteEstadoTareaLocal,
    getTituloTareaLocal,
    getTextoConfirmacionTareaLocal,
    getTextoBorrarTareaLocal,
    getTextoContinuarTareaLocal,
    filtraTareasLocales
} from "../../comun/utils"

// Queries 
import { useQuery } from "react-query"
import { 
    QUERY_TAREAS_LOCALES_ACTIVAS ,
    fetchTareasLocalesActivas
} from "../../../queries/TareaLocal"

// Mutations
import { useMutation, useQueryClient } from "react-query"
import { 
    actualizaEstadoTareaLocal, 
    borraTareaLocal, 
} from "../../../mutations/TareaLocal"

// Components
import TareasLocalesHeader from "./TareasLocalesHeader"
import TareaLocal from "./TareaLocalCard"
import ConfirmacionModal from '../../comun/ConfirmacionModal'

// Constantes
const TIPO_CONFIRMACION = {
    BORRANDO: 0,
    RECOLECTANDO_FORWARD: 1
} 

const TareasLocalesHome = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const { sucursalActual } = useOlimpio()
    const { filtros } = useTareasLocales()
    const { credenciales } = useAuth()

    // State
    const [tareaLocal, setTareaLocal] = useState(0)
    const [tipoConfirmacion, setTipoConfirmacion] = useState(null)
  
    // Modals
    const [confirmacion, setConfirmacion] = useState({ mensaje: '', mostrar: false })

    // Queries
    const { data: tareasLocalesActivas, isLoading, refetch } = useQuery(QUERY_TAREAS_LOCALES_ACTIVAS, fetchTareasLocalesActivas)

    // Mutations
    const { mutate: doBorraTareaLocal } = useMutation ({
        mutationFn: borraTareaLocal,
        onSuccess: ({id_tarea_local}) => {
            queryClient.setQueriesData(QUERY_TAREAS_LOCALES_ACTIVAS, (current) => (
                current.filter(tarea => (parseInt(tarea.id_tarea_local) !== parseInt(id_tarea_local)))
            ))
        }
    })

    const { mutate: doActualizaEstadoTareaLocal } = useMutation ({
        mutationFn: actualizaEstadoTareaLocal,
        onSuccess: ({data}) => {
            queryClient.setQueriesData(QUERY_TAREAS_LOCALES_ACTIVAS, (current) => (
                current.map(tarea => (
                    parseInt(tarea.id_tarea_local) === parseInt(data.id_tarea_local) ? 
                        {...tarea, id_estado_tarea: data.id_estado_tarea} : 
                        tarea 
                ))
            ))
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
                return doBorraTareaLocal({id_tarea_local: tareaLocal.id_tarea_local})
            } 
    
            return doActualizaEstadoTareaLocal({
                id_tarea_local: tareaLocal.id_tarea_local, 
                id_estado_tarea: getSiguienteEstadoTareaLocal(filtros.estado),
                id_usuario: credenciales.id_usuario
            })
        }
    }

    function handleContinuar(tarea) {
        setTareaLocal(tarea)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacionTareaLocal(filtros.estado), mostrar: true}))
    }

    function handleBorrar(tarea) {
        setTareaLocal(tarea)
        setConfirmacion(prevValue => ({...prevValue, mensaje: '¿Seguro que quieres borrar la tarea?', mostrar: true}))
        setTipoConfirmacion(TIPO_CONFIRMACION.BORRANDO)
    }
    
    function handleLog(tareaLocal) {
        navigate('/tracking/tareas-locales/bitacora-tarea-local', {
            state: {
                id_tarea_local: tareaLocal.id_tarea_local
            }
        })
    }

    function handleRefresh() {
        refetch()
    }

    // Cuerpo principal del componente

    if (isLoading) return <Spinner animation="border" />

    if (tareasLocalesActivas) {
      // Obtengo las tareas que voy a desplegar
      var tareas = filtraTareasLocales(tareasLocalesActivas, filtros, sucursalActual)
    }

    return (
        <>
            <ConfirmacionModal 
                mostrar={confirmacion.mostrar} 
                titulo='Confirmación' 
                mensaje={confirmacion.mensaje}
                onConfirmar={handleConfirmacion}
            />
    
            <TareasLocalesHeader 
                titulo={getTituloTareaLocal(filtros.estado)} 
                renglones={tareas.length}
                onRefresh={handleRefresh}
            />

            <Row xs={1} md={1} lg={2} className="g-3">
            {
                tareas.map(tarea => (
                    <TareaLocal 
                        tareaLocal={tarea} 
                        textoContinuar={getTextoContinuarTareaLocal(filtros.estado)}
                        textoBorrar={getTextoBorrarTareaLocal(filtros.estado)}
                        onContinuar={handleContinuar}
                        onBorrar={handleBorrar}
                        onLog={handleLog}
                        key={tarea.id_tarea_local} 
                    />
                ))
            }
            </Row>
        </>
      )
}

export default TareasLocalesHome
