import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import { Row, Spinner } from "react-bootstrap"

// Hooks
import { useAuth } from "../../../hooks/useAuth"
import { useOlimpio } from "../../../context/OlimpioContext"
import { useServiciosDomicilio, STATUS_SERVICIO_DOMICILIO } from "../../../context/ServiciosDomicilioContext"

// Utils
import { 
    getSiguienteEstadoServicioDomicilio, 
    getTextoConfirmacionServicioDomicilio, 
    getTextoContinuarServicioDomicilio, 
    getTituloServicioDomicilio  ,
    filtraServiciosDomicilio
} from "../../comun/utils"

// Queries
import { useQuery } from "react-query"
import { 
    QUERY_SERVICIOS_DOMICILIO_ACTIVOS,
    QUERY_SERVICIOS_DOMICILIO_POR_PAGAR,
    fetchServiciosDomicilioActivos,
    fetchServiciosDomicilioPorPagar
} from "../../../queries/ServicioDomicilio"

// Mutations
import { useMutation, useQueryClient } from "react-query"
import { actualizaEstado } from "../../../mutations/ServicioDomicilio"

// Componentes
import ServiciosDomicilioHeader from "./ServiciosDomicilioHeader"
import ServicioDomicilio from "./ServicioDomicilioCard"
import ConfirmacionModal from '../../comun/ConfirmacionModal'

const ServiciosDomicilioHome = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { sucursalActual } = useOlimpio()
    const { filtros } = useServiciosDomicilio()
    const { credenciales } = useAuth()

    // State
    let   serviciosDomicilio = []
    const [idServicioDomicilio, setIdServicioDomicilio] = useState(0)

    // Modals
    const [confirmacion, setConfirmacion] = useState({ mensaje: '', mostrar: false })

    // Queries
    const { data: serviciosDomicilioActivos, isLoading: isLoadingActivos, error: errorActivos, refetch: refetchActivos } = useQuery({
        queryKey: [QUERY_SERVICIOS_DOMICILIO_ACTIVOS], 
        queryFn: fetchServiciosDomicilioActivos,
        retry: false
    })

    const { data: serviciosDomicilioPorPagar, isLoading: isLoadingPorPagar, error: errorPorPagar, refetch: refetchPorPagar } = useQuery({
        queryKey: [QUERY_SERVICIOS_DOMICILIO_POR_PAGAR], 
        queryFn: fetchServiciosDomicilioPorPagar,
        retry: false
    })

    // Mutations
    const { mutate: doActualizaEstadoServicioDomicilio } = useMutation ({
        mutationFn: actualizaEstado,
        onSuccess: ({data}) => {
            queryClient.setQueriesData(QUERY_SERVICIOS_DOMICILIO_ACTIVOS, (current) => (
                current.map(serviciosDomicilio => (
                    parseInt(serviciosDomicilio.id_servicio_domicilio) === parseInt(data.id_servicio_domicilio) ? 
                        {...serviciosDomicilio, id_estado_servicio_domicilio: data.id_estado_servicio_domicilio} : 
                        serviciosDomicilio 
                ))
            ))
        }
    })

    // Handlers

    function handleContinuar(idServicioDomicilio) {
        setIdServicioDomicilio(idServicioDomicilio)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacionServicioDomicilio(filtros.estado), mostrar: true}))
    }

    function handleConfirmacion(confirmado) {
        // Cierro la modal
        setConfirmacion(prevValue => ({...prevValue, mostrar: false}))

        // Si dieron confirmar
        if (confirmado) {
            return doActualizaEstadoServicioDomicilio({
                id_servicio_domicilio: idServicioDomicilio, 
                id_estado_servicio_domicilio: getSiguienteEstadoServicioDomicilio(filtros.estado), 
                id_usuario: credenciales.id_usuario
            })
        }
    }

    function handleLog(idServicioDomicilio) {
        navigate('/tracking/servicios-domicilio/bitacora-servicio-domicilio', {
            state: {
                id_servicio_domicilio: idServicioDomicilio
            }
        })
    }

    function handleEditarInformacionPago(idServicioDomicilio) {
        navigate('/tracking/servicios-domicilio/actualiza-informacion-pago', {
            state: {
                id_servicio_domicilio: idServicioDomicilio
            }
        })
    }

    function handleCambiarFecha(idServicioDomicilio) {
        navigate('/tracking/servicios-domicilio/actualiza-fecha-requerida', {
            state: {
                id_servicio_domicilio: idServicioDomicilio
            }
        })
    }

    function handleEditarInformacionGeneral(idServicioDomicilio) {
        navigate('/tracking/servicios-domicilio/actualiza-informacion-general', {
            state: {
                id_servicio_domicilio: idServicioDomicilio
            }
        })
    }

    function handleCancelar(idServicioDomicilio) {
        navigate('/tracking/servicios-domicilio/cancelar', {
            state: {
                id_servicio_domicilio: idServicioDomicilio
            }
        })
    }

    function handleRefresh() {
        refetchActivos()
        refetchPorPagar()
    }

    // Cuerpo principal del componente

    if (isLoadingActivos || isLoadingPorPagar) return <Spinner animation="border" />

    if (errorActivos) return <span>{errorActivos.message}</span>

    if (errorPorPagar) return <span>{errorPorPagar.message}</span>

    if (serviciosDomicilioActivos && serviciosDomicilioPorPagar) {
        // Obtengo los servicios que voy a desplegar

        // Si estamos mostrando los servicios por pagar
        if (parseInt(filtros.estado) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_DE_PAGO) 
            serviciosDomicilio = filtraServiciosDomicilio(serviciosDomicilioPorPagar, filtros, sucursalActual)
        // Estamos mostrando todos los servicios activos (ni terminados ni cancelados)
        else 
            serviciosDomicilio = filtraServiciosDomicilio(serviciosDomicilioActivos, filtros, sucursalActual)
    }
  
    return (
        <>
            <ConfirmacionModal 
                mostrar={confirmacion.mostrar} 
                titulo='Confirmación' 
                mensaje={confirmacion.mensaje}
                onConfirmar={handleConfirmacion}
            />

            <ServiciosDomicilioHeader 
                titulo={getTituloServicioDomicilio(filtros.estado)} 
                renglones={serviciosDomicilio.length}
                onRefresh={handleRefresh}
            />

            <Row sm={1} xs={1} md={1} lg={2} className="g-3">
            {
                serviciosDomicilio.map(servicioDomicilio => (
                    <ServicioDomicilio 
                        servicioDomicilio={servicioDomicilio} 
                        textoContinuar={getTextoContinuarServicioDomicilio(filtros.estado)}
                        onContinuar={handleContinuar}
                        onCancelar={handleCancelar}
                        onLog={handleLog}
                        onEditarInformacionPago={handleEditarInformacionPago}
                        onEditarInformacionGeneral={handleEditarInformacionGeneral}
                        onCambiarFecha={handleCambiarFecha}              
                        key={servicioDomicilio.id_servicio_domicilio} 
                    />
                ))
            }
            </Row>
        </>
    )
}

export default ServiciosDomicilioHome
