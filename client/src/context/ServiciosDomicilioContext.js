import React, { useContext, useState } from "react";

export const STATUS_SERVICIO_DOMICILIO = {
    SERVICIOS_DOMICILIO_ACTIVOS: 0,
    PENDIENTE_RECOLECCION_EN_CLIENTE: 1,
    RECOLECTADO_PARA_ENTREGA_SUCURSAL: 2,
    RECIBIDO_EN_SUCURSAL: 3,
    PENDIENTE_RECOLECCION_EN_SUCURSAL: 4,
    RECOLECTADO_PARA_ENTREGA_CLIENTE: 5,
    ENTREGADO_A_CLIENTE: 6,
    PENDIENTE_DE_PAGO: 7,
    TERMINADO: 100,
    CANCELADO: 101
} 

const ServiciosDomicilioContext = React.createContext()

export function useServiciosDomicilio() {
    return useContext(ServiciosDomicilioContext)
}

export function ServiciosDomicilioProvider({children}) {
    const [estadoActual, setEstadoActual] = useState(STATUS_SERVICIO_DOMICILIO.SERVICIOS_DOMICILIO_ACTIVOS)
    const [ticketFiltro, setTicketFiltro] = useState('')
    const [sucursalFiltro, setSucursalFiltro] = useState(0)

    return (
        <ServiciosDomicilioContext.Provider value={{
            estadoActual, ticketFiltro, sucursalFiltro,
            setEstadoActual, setTicketFiltro, setSucursalFiltro
        }}>
            {children}
        </ServiciosDomicilioContext.Provider>
    )
}

