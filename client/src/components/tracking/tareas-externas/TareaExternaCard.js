import { Button, Card, Col } from "react-bootstrap"
import { FaArrowAltCircleRight, FaTrashAlt, FaCheck, FaRegCalendarAlt, FaTicketAlt, FaShareSquare } from 'react-icons/fa'

import { useAuth } from "../../../hooks/useAuth"
import { STATUS_TAREA, TIPOS_SERVICIO, useTareasExternas } from "../../../context/TareasExternasContext"
import { formateaFecha, formateaFechaHora } from '../../comun/utils'

const TareaExterna = ({tareaExterna, textoContinuar, textoBorrar, textoForward, onContinuar, onBorrar, onForward }) => {
    const { estadoActual } = useTareasExternas()
    const { esMaquila, esEncargado, esChofer, credenciales } = useAuth()

    function mostrarBotonAccionContinuar() {
        if (!textoContinuar)
            return false
        
        switch (parseInt(estadoActual)) {
            case STATUS_TAREA.PENDIENTE_RECOLECCION: 
                return esChofer()
            case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE: 
                return esEncargado() || esMaquila()
            case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE: 
                return esEncargado() || esMaquila()
            case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR: 
                return esChofer()
            case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
                return esChofer()
            case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN: 
                return esEncargado() || esMaquila()
            case STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN: 
                return esEncargado() || esMaquila()
            default:
                break
        }
    }

    function mostrarBotonAcccionBorrar() {
        if (!textoBorrar)
            return false

        return (
            parseInt(estadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION && 
            parseInt(tareaExterna.id_creado_por) === parseInt(credenciales.id_usuario) &&
            esEncargado()
        )
    }

    function mostrarBotonAccionForward() {
        if (!textoForward)
            return false

        return (
            parseInt(estadoActual) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE && 
            esEncargado()
        )
    }

    return (
        <Col>
            <Card border={parseInt(tareaExterna.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                <Card.Header>
                    <Card.Subtitle className="text-primary">{tareaExterna.estado_tarea}</Card.Subtitle>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title><FaTicketAlt /> {tareaExterna.ticket.padStart(6, '0')}</Card.Title>
                        <Card.Subtitle>
                            { tareaExterna.sucursal_origen }
                            { " " } <FaArrowAltCircleRight /> { " " }
                            { tareaExterna.sucursal_destino }
                        </Card.Subtitle>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <small>{formateaFecha(tareaExterna.fecha_creacion)}</small>
                        <small>{tareaExterna.creado_por}</small>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                        {tareaExterna.tipo_trabajo} { " - "}
                        {tareaExterna.tipo_servicio}
                    </Card.Subtitle>
                    <Card.Text>
                        {tareaExterna.descripcion}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                        <small><FaRegCalendarAlt /> {formateaFechaHora(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}</small>
                    </div>
                    <div>
                        {
                            mostrarBotonAcccionBorrar() && (
                                <>
                                    <Button 
                                        size="sm" 
                                        onClick={() => onBorrar(tareaExterna.id_tarea_externa)} 
                                        variant='danger'
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                    <span> </span>
                                </>
                            )
                        }
                        {
                            mostrarBotonAccionForward() && (
                                <>
                                    <Button 
                                        size="sm" 
                                        onClick={() => onForward(tareaExterna.id_tarea_externa)} 
                                        variant='secondary'
                                    >
                                        <FaShareSquare />
                                    </Button>
                                    <span> </span>
                                </>
                            )
                        }
                        {
                            mostrarBotonAccionContinuar() && (
                                <Button 
                                    size="sm"
                                    onClick={() => onContinuar(tareaExterna.id_tarea_externa)}
                                >
                                    <FaCheck />
                                </Button>
                            )
                        }
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default TareaExterna
