import { Navigate, useOutlet } from "react-router-dom"
import { useTareasExternas } from "../../context/TareasExternasContext"

const ProtectedLayout = () => {
    const outlet = useOutlet()
    const { conectado } = useTareasExternas()

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
