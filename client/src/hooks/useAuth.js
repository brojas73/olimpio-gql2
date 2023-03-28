import { createContext, useState, useContext } from "react"

export const ROLES = {
    ADMIN: 1,
    ENCARGADO: 2,
    CHOFER: 3,
    MAQUILA: 4
}

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [credenciales, setCredenciales] = useState(null)

    function logout() {
        setCredenciales(null)
    }

    function esMaquila() {
        return parseInt(credenciales.id_rol) === ROLES.MAQUILA
    }

    function esEncargado() {
        return (esAdmin() || parseInt(credenciales.id_rol) === ROLES.ENCARGADO)
    }

    function esChofer() {
        return (esAdmin() || parseInt(credenciales.id_rol) === ROLES.CHOFER)
    }

    function esAdmin() {
        return parseInt(credenciales.id_rol) === ROLES.ADMIN
    }

    function getUsuario() {
        return credenciales.nombre
    }

    return (
        <AuthContext.Provider value={{
            credenciales, logout, esMaquila, esEncargado, esChofer, esAdmin, getUsuario,
            setCredenciales
        }}>
            {children}
        </AuthContext.Provider>
    )
}

