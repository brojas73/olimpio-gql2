import { useNavigate } from "react-router-dom"

import { Navbar, Container, Button, Badge } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'

import { useAuth } from "../../../hooks/useAuth"
import { STATUS_SERVICIO_DOMICILIO, useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

const TituloServicioDomicilio = ({titulo, renglones}) => {
    const navigate = useNavigate()
    const { estadoSDActual } = useServiciosDomicilio()
    const { esEncargado } = useAuth()

    function nuevoServicioDomicilio() {
        navigate('/servicios-domicilio/nuevo-servicio-domicilio')
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
                (esEncargado() && (
                        parseInt(estadoSDActual) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE ||
                        parseInt(estadoSDActual) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL
                    ) && (
                        <Container className="justify-content-end">
                            <Button onClick={nuevoServicioDomicilio} variant='dark' size="sm">
                                <FaPlus />
                            </Button>
                        </Container>
                    )
                )
            }
        </Navbar>
    )
}

export default TituloServicioDomicilio
