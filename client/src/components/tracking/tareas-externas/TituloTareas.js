import { useNavigate } from "react-router-dom"
import { Navbar, Button, Badge } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

import { useAuth } from "../../../hooks/useAuth"
import { TAMANO_CONTROLES } from "../../comun/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"

const TituloTareas = ({titulo, renglones, onRefresh}) => {
    const navigate = useNavigate()
    const { esEncargado } = useAuth()

    function handleOnClick() {
        navigate('/tracking/tareas-externas/nueva-tarea')
    }

    function handleRefresh() {
        onRefresh()
    }

    return (
        <Navbar className="d-flex justify-content-between align-items-center">
            <Button variant="dark" size={TAMANO_CONTROLES}  onClick={handleRefresh}>
                <FontAwesomeIcon icon={faRefresh} />
                &nbsp;
                {titulo} 
                &nbsp;
                <Badge bg="primary" pill>{renglones}</Badge>
            </Button>
            {
                esEncargado() && (
                    <>
                        <Button onClick={handleOnClick} variant='dark' size={TAMANO_CONTROLES}>
                            <FaPlus />
                        </Button>
                    </>
                )
            }
        </Navbar>
    )
}

export default TituloTareas
