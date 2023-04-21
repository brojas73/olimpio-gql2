import { Navigate, useOutlet } from "react-router-dom"
import { useOlimpio } from "../../context/OlimpioContext"

const ProtectedLayout = () => {
    const outlet = useOutlet()
    const { conectado } = useOlimpio()

    if (!conectado) {
        return <Navigate to='/login' />
    }

    return (
        <>
            {outlet}
        </>
    )
}

export default ProtectedLayout
