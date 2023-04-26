import React, { useContext, useState } from "react";

const ConsultasContext = React.createContext()

export function useConsultas() {
    return useContext(ConsultasContext)
}

export function ConsultasProvider({children}) {
    const [filtros, setFiltros] = useState({ticket: '', descripcion: '', tipoConsutla: 0})

    function initFiltros() {
        setFiltros(prevValue => ({...prevValue, ticket: '', descripcion: '', tipoConsulta: 0}))
    }

    return (
        <ConsultasContext.Provider value={{
            filtros, setFiltros, initFiltros
        }}>
            {children}
        </ConsultasContext.Provider>
    )
}

