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

const TareasExternasContext = React.createContext()

export function useTareasExternas() {
    return useContext(TareasExternasContext)
}

export function TareasExternasProvider({children}) {
    const [filtros, setFiltros] = useState({ticket: '', sucursal: 0, estado: STATUS_TAREA.TAREAS_ACTIVAS})

    function initFiltros() {
        setFiltros(prevValue => ({...prevValue, ticket: '', sucursal: 0, estado: STATUS_TAREA.TAREAS_ACTIVAS}))
    }

    return (
        <TareasExternasContext.Provider value={{
            filtros, setFiltros, initFiltros
        }}>
            {children}
        </TareasExternasContext.Provider>
    )
}
