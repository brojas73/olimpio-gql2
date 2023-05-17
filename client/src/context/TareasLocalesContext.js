import React, { useContext, useState } from "react";

export const STATUS_TAREA_LOCAL = {
    TAREAS_ACTIVAS: 0,
    POR_ATENDERSE: 1,
    TERMINADO: 2,
    CERRADO: 3,
    REDIRECCIONADO: 4
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

const TareasLocalesContext = React.createContext()

export function useTareasLocales() {
    return useContext(TareasLocalesContext)
}

export function TareasLocalesProvider({children}) {
    const [filtros, setFiltros] = useState({ticket: '', sucursal: 0, estado: STATUS_TAREA_LOCAL.TAREAS_ACTIVAS})

    function initFiltros() {
        setFiltros(prevValue => ({...prevValue, ticket: '', sucursal: 0, estado: STATUS_TAREA_LOCAL.TAREAS_ACTIVAS}))
    }

    return (
        <TareasLocalesContext.Provider value={{
            filtros, setFiltros, initFiltros
        }}>
            {children}
        </TareasLocalesContext.Provider>
    )
}
