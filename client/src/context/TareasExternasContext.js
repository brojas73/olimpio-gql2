import React, { useContext, useState } from "react";

export const STATUS_TAREA = {
    TAREAS_ACTIVAS: 0,
    PENDIENTE_RECOLECCION: 1,
    RECOLECTADO_PARA_ATENDERSE: 2,
    RECIBIDO_PARA_ATENDERSE: 3,
    TERMINADO_PARA_RECOLECTAR: 4,
    RECOLECTADO_PARA_ENTREGA: 5,
    ENTREGADO_A_SUCURSAL_ORIGEN: 6,
    RECIBIDO_EN_SUCURSAL_ORIGEN: 7,
    REDIRECCIONADO: 8
} 

export const TIPOS_SERVICIO = {
    NORMAL: 1,
    EXPRESS: 2
}

export const TIPO_ACCION = {
    INSERT: 1,
    DELETE: 2,
    UPDATE: 3
}

export const SUCURSAL_DEFAULT = 1

const TareasExternasContext = React.createContext()
const TareasExternasUpdateContext = React.createContext()

export function useTareasExternas() {
    return useContext(TareasExternasContext)
}

export function useTareasExternasUpdate() {
    return useContext(TareasExternasUpdateContext)
}

export function TareasExternasProvider({children}) {
    const [conectado, setConectado] = useState(false)
    const [sucursalActual, setSucursalActual] = useState(SUCURSAL_DEFAULT)
    const [estadoActual, setEstadoActual] = useState(STATUS_TAREA.TAREAS_ACTIVAS)

    const [ticketFiltro, setTicketFiltro] = useState('')
    const [sucursalFiltro, setSucursalFiltro] = useState(0)
    const [tipoServicioFiltro, setTipoServicioFiltro] = useState(0)
    const [tipoTrabajoFiltro, setTipoTrabajoFiltro] = useState(0)

    return (
        <TareasExternasContext.Provider value={{
            conectado, sucursalActual, estadoActual,
            ticketFiltro, sucursalFiltro, tipoServicioFiltro, tipoTrabajoFiltro, 
            setConectado, setSucursalActual, setEstadoActual,
            setTicketFiltro, setSucursalFiltro, setTipoServicioFiltro, setTipoTrabajoFiltro
        }}>
            <TareasExternasUpdateContext.Provider value={{}}>
                {children}
            </TareasExternasUpdateContext.Provider>
        </TareasExternasContext.Provider>
    )
}

