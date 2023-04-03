import React, { useContext, useState } from "react";

export const STATUS_SERVICIO_DOMICILIO = {
    SERVICIOS_DOMICILIO_ACTIVOS: 0,
    PENDIENTE_RECOLECCION_EN_CLIENTE: 1,
    RECOLECTADO_PARA_ENTREGA_SUCURSAL: 2,
    RECIBIDO_EN_SUCURSAL: 3,
    PENDIENTE_RECOLECCION_EN_SUCURSAL: 4,
    RECOLECTADO_PARA_ENTREGA_CLIENTE: 5,
    ENTREGADO_A_CLIENTE: 6,
    TERMINADO: 100
} 

const ServiciosDomicilioContext = React.createContext()
const ServiciosDomicilioUpdateContext = React.createContext()

export function useServiciosDomicilio() {
    return useContext(ServiciosDomicilioContext)
}

export function useServiciosDomicilioUpdate() {
    return useContext(ServiciosDomicilioUpdateContext)
}

export function ServiciosDomicilioProvider({children}) {
    const [estadoSDActual, setEstadoSDActual] = useState(STATUS_SERVICIO_DOMICILIO.SERVICIOS_DOMICILIO_ACTIVOS)

    const [ticketFiltro, setTicketFiltro] = useState('')
    const [sucursalFiltro, setSucursalFiltro] = useState(0)

    return (
        <ServiciosDomicilioContext.Provider value={{
            estadoSDActual,
            ticketFiltro, sucursalFiltro,
            setEstadoSDActual,
            setTicketFiltro, setSucursalFiltro
        }}>
            <ServiciosDomicilioUpdateContext.Provider value={{}}>
                {children}
            </ServiciosDomicilioUpdateContext.Provider>
        </ServiciosDomicilioContext.Provider>
    )
}

