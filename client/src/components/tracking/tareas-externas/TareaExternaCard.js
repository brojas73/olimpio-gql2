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
                        <Card.Title>
                            <FaTicketAlt /> 
                            <span> </span>
                            <span className="align-middle">
                               {tareaExterna.ticket.padStart(6, '0')}
                            </span>
                        </Card.Title>
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
                    <small>
                        <FaRegCalendarAlt /> 
                        <span> </span>
                        <span className="align-middle">
                            {formateaFechaHora(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}
                        </span>
                    </small>
                    <div>
                        {
                            mostrarBotonAcccionBorrar() && (
                                <>
                                    <Button 
                                        size="sm" 
                                        onClick={() => onBorrar(tareaExterna.id_tarea_externa)} 
                                        variant='outline-danger'
                                    >
                                        <FaTrashAlt />
                                        <span> </span>
                                        <span className="align-middle">
                                            {textoBorrar}
                                        </span>
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
                                        variant='outline-secondary'
                                    >
                                        <FaShareSquare />
                                        <span> </span>
                                        <span className="align-middle">
                                            {textoForward}
                                        </span>
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
                                    variant='outline-primary'
                                >
                                    <FaCheck /> 
                                    <span> </span>
                                    <span className="align-middle">
                                        {textoContinuar}
                                    </span>
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
