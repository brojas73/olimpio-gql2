import React, { useContext, useState } from "react";

const ConsultasContext = React.createContext()

export function useConsultas() {
    return useContext(ConsultasContext)
}

export function ConsultasProvider({children}) {
    const [tipoConsultaActual, setTipoConsultaActual] = useState(0)
    const [ticketFiltro, setTicketFiltro] = useState('')
    const [sucursalFiltro, setSucursalFiltro] = useState(0)

    return (
        <ConsultasContext.Provider value={{
            tipoConsultaActual, ticketFiltro, sucursalFiltro, 
            setTipoConsultaActual, setTicketFiltro, setSucursalFiltro,
        }}>
                {children}
        </ConsultasContext.Provider>
    )
}

