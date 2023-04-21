import React, { useContext, useState } from "react";

export const SUCURSAL_DEFAULT = 1

const OlimpioContext = React.createContext()

export function useOlimpio() {
    return useContext(OlimpioContext)
}

export function OlimpioProvider({children}) {
    const [conectado, setConectado] = useState(false)
    const [sucursalActual, setSucursalActual] = useState(SUCURSAL_DEFAULT)

    return (
        <OlimpioContext.Provider value={{
            conectado, sucursalActual,
            setConectado, setSucursalActual,
        }}>
            {children}
        </OlimpioContext.Provider>
    )
}

