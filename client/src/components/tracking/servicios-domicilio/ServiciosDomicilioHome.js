import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import { Row, Spinner } from "react-bootstrap"

// Hooks
import { useAuth } from "../../../hooks/useAuth"
import { useTareasExternas } from "../../../context/TareasExternasContext"
import { useServiciosDomicilio, STATUS_SERVICIO_DOMICILIO } from "../../../context/ServiciosDomicilioContext"

// Queries
import { useQuery } from "react-query"
import { 
    QUERY_SERVICIOS_DOMICILIO_ACTIVOS,
    fetchServiciosDomicilioActivos
} from "../../../queries/ServicioDomicilio"

// Mutations
import { useMutation, useQueryClient } from "react-query"
import { actualizaEstado } from "../../../mutations/ServicioDomicilio"

// Componentes
import ServiciosDomicilioHeader from "./ServiciosDomicilioHeader"
import ServicioDomicilio from "./ServicioDomicilioCard"
import Confirmacion from '../../comun/Confirmacion'

// Funciones helpers
function getSiguienteEstado(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
            return STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
            return STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL
        case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
            return STATUS_SERVICIO_DOMICILIO.TERMINADO
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
            return STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
            return STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE
        case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
            return STATUS_SERVICIO_DOMICILIO.TERMINADO
        default:
            return null
    }
}

function getTextoConfirmacion(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
            return '¿Seguro que quieres recolectar el servicio a domicilio?'
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
            return '¿Seguro que quieres entregar el servicio a domicilio?'
        case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
            return '¿Seguro que quieres terminar el servicio a domicilio?'
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
            return '¿Seguro que quieres recolectar el servicio a domicilio?'
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
            return '¿Seguro que quieres entregar el servicio a domicilio?'
        case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
            return '¿Seguro que quieres terminar el servicio a domicilio?'
        default:
            return 'Desconocido'
    }
}

function getTitulo(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_SERVICIO_DOMICILIO.SERVICIOS_DOMICILIO_ACTIVOS:
            return 'Servicios a Domicilio Activos'
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
            return 'Pendiente de Recolección en Cliente'
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
            return 'Recolectados para Entrega En Sucursal'
        case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
            return 'Recibidos en Sucursal'
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
            return 'Pendiente de Recolección en Sucursal'
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
            return 'Recolectados para Entrega a Cliente'
        case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
            return 'Entregados al Cliente'
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_DE_PAGO:
            return 'Pendiente de Pago'
        default:
            return 'Desconocido'
    }
}

function getTextoContinuar(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
            return 'Recolectar'
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
            return 'Entregar'
        case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
            return 'Terminar'
        case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
            return 'Recolectar'
        case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
            return 'Entregar'
        case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
            return 'Terminar'
        default:
            return 'Desconocido'
    }
}

const ServiciosDomicilioHome = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { sucursalActual } = useTareasExternas()
    const { ticketFiltro, sucursalFiltro, estadoActual } = useServiciosDomicilio()
    const { credenciales } = useAuth()

    // State
    const [idServicioDomicilio, setIdServicioDomicilio] = useState(0)

    // Modals
    const [confirmacion, setConfirmacion] = useState({ mensaje: '', mostrar: false })

    // Queries
    const { data: serviciosDomicilioActivos, isLoading } = useQuery(QUERY_SERVICIOS_DOMICILIO_ACTIVOS, fetchServiciosDomicilioActivos)

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

    // Funciones
    function filtraServiciosDomicilio(seviciosDomicilioActivos) {
        const serviciosDomicilioFiltrados = serviciosDomicilioActivos.filter(servicioDomicilio => 
            (ticketFiltro.length === 0 || (ticketFiltro.length > 0 && servicioDomicilio.ticket.includes(ticketFiltro))) &&
            (sucursalFiltro === 0 || (sucursalFiltro !== 0 && servicioDomicilio.id_sucursal === sucursalFiltro)) 
        )

        switch (parseInt(estadoActual)) {
            case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
                return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
                    parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE &&
                    parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual)
                ))
            case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
                return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
                    parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL &&
                    parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual)
                ))
            case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
                return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
                    parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL &&
                    parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
                ))
            case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
                return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
                    parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL &&
                    parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
                ))
            case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
                return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
                    parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE &&
                    parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
                ))
            case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
                return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
                    parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE &&
                    parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
            ))
            case STATUS_SERVICIO_DOMICILIO.PENDIENTE_DE_PAGO:
                return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
                    servicioDomicilio.pagado === 'N' &&
                    parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
            ))
            default:
                return serviciosDomicilioFiltrados
            }
    }

    // Handlers

    function handleContinuar(idServicioDomicilio) {
        setIdServicioDomicilio(idServicioDomicilio)
        setConfirmacion(prevValue => ({...prevValue, mensaje: getTextoConfirmacion(estadoActual), mostrar: true}))
    }

    function handleConfirmacion(confirmado) {
        // Cierro la modal
        setConfirmacion(prevValue => ({...prevValue, mostrar: false}))

        // Si dieron confirmar
        if (confirmado) {
            return doActualizaEstadoServicioDomicilio({
                id_servicio_domicilio: idServicioDomicilio, 
                id_estado_servicio_domicilio: getSiguienteEstado(estadoActual), 
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

    // Cuerpo principal del componente

    if (isLoading) return <Spinner animation="border" />

    if (serviciosDomicilioActivos) {
      // Obtengo las tareas que voy a desplegar
      var serviciosDomicilio = filtraServiciosDomicilio(serviciosDomicilioActivos)
    }
  
    return (
        <>
            <Confirmacion 
                mostrar={confirmacion.mostrar} 
                titulo='Confirmación' 
                mensaje={confirmacion.mensaje}
                onConfirmar={handleConfirmacion}
            />

            <ServiciosDomicilioHeader 
                titulo={getTitulo(estadoActual)} 
                renglones={serviciosDomicilio.length}
            />

            <Row sm={1} xs={1} md={1} lg={2} className="g-3">
            {
                serviciosDomicilio.map(servicioDomicilio => (
                    <ServicioDomicilio 
                        servicioDomicilio={servicioDomicilio} 
                        textoContinuar={getTextoContinuar(estadoActual)}
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
