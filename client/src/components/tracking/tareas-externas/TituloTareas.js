import { useNavigate } from "react-router-dom"
import { Navbar, Button, Badge } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

import { useAuth } from "../../../hooks/useAuth"
import { TAMANO_CONTROLES } from "../../comun/utils"

const TituloTareas = ({titulo, renglones}) => {
    const navigate = useNavigate()
    const { esEncargado } = useAuth()

    function nuevaTarea() {
        navigate('/tracking/tareas-externas/nueva-tarea')
    }

    return (
        <Navbar className="d-flex justify-content-between align-items-center">
            <Button variant="dark" size={TAMANO_CONTROLES}>
                {titulo} 
                &nbsp;
                <Badge bg="primary" pill>{renglones}</Badge>
            </Button>
            {
                esEncargado() && (
                    <Button onClick={nuevaTarea} variant='dark' size={TAMANO_CONTROLES}>
                        <FaPlus />
                    </Button>
                )
            }
        </Navbar>
    )
}

export default TituloTareas
