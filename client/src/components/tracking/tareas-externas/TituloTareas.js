import { useNavigate } from "react-router-dom"
import { Navbar, Container, Button, Badge } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

import { useTareasExternas } from "../../../context/TareasExternasContext"
import { STATUS_TAREA } from "../../../context/TareasExternasContext"

import { useAuth } from "../../../hooks/useAuth"

const TituloTareas = ({titulo, renglones}) => {
    const navigate = useNavigate()
    const { estadoActual } = useTareasExternas()
    const { esEncargado } = useAuth()

    function nuevaTarea() {
        navigate('/tracking/nueva-tarea')
    }

    return (
        <Navbar>
            <Container className="justify-content-start">
                <Button variant="dark" size="md">
                    {titulo} { " "}
                    <Badge bg="primary">{renglones}</Badge>
                </Button>
            </Container>
            {
                (esEncargado() && parseInt(estadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION) && (
                    <Container className="justify-content-end">
                        <Button onClick={nuevaTarea} variant='dark' size="sm">
                            <FaPlus />
                        </Button>
                    </Container>
                )
            }
        </Navbar>
    )
}

export default TituloTareas
