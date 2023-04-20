import { Card, Col, NavLink } from "react-bootstrap"
import { FaClipboardList, FaArrowAltCircleRight, FaTrashAlt, FaCheck, FaRegCalendarAlt, FaTicketAlt, FaShareSquare } from 'react-icons/fa'

import { useAuth } from "../../../hooks/useAuth"
import { STATUS_TAREA, TIPOS_SERVICIO, useTareasExternas } from "../../../context/TareasExternasContext"
import { esRedireccionada, formateaFecha, formateaFechaHora } from '../../comun/utils'

const TareaExterna = ({tareaExterna, textoContinuar, textoBorrar, textoForward, onContinuar, onBorrar, onForward, onLog, onRecolectarForwarded }) => {
    const { estadoActual } = useTareasExternas()
    const { esMaquila, esEncargado, esChofer } = useAuth()

    function handleContinuar() {
        if (esRedireccionada(tareaExterna))
            onRecolectarForwarded(tareaExterna.id_tarea_externa, tareaExterna.id_sucursal_redireccion)
        else
            onContinuar(tareaExterna.id_tarea_externa)
    }
 
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
                return false
        }
    }

    function mostrarBotonAcccionBorrar() {
        if (!textoBorrar)
            return false

        if (esRedireccionada(tareaExterna))
            return false

        return (
            parseInt(estadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION && 
            // parseInt(tareaExterna.id_creado_por) === parseInt(credenciales.id_usuario) &&
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
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Subtitle className="text-primary">{tareaExterna.estado_tarea}</Card.Subtitle>
                        <NavLink 
                            onClick={() => onLog(tareaExterna.id_tarea_externa)} 
                            className="link-dark"
                        >
                            <small>
                                <FaClipboardList /> 
                                <span className="align-middle ms-1">
                                    Log
                                </span>
                            </small>
                        </NavLink>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Subtitle>
                            <FaTicketAlt className="me-1"/> 
                            <span className="align-middle">
                                {tareaExterna.ticket.padStart(6, '0')}
                            </span>
                        </Card.Subtitle>
                        <Card.Subtitle>
                            { tareaExterna.sucursal_origen } <FaArrowAltCircleRight className="mx-1"/> { tareaExterna.sucursal_destino }
                            {
                                esRedireccionada(tareaExterna) && (
                                    <>
                                        <FaArrowAltCircleRight className="mx-1"/>{tareaExterna.sucursal_redireccion}
                                    </>
                                )
                            }
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
                        <small>
                            <FaRegCalendarAlt /> 
                            <span className="align-middle ms-1">
                                {formateaFechaHora(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}
                            </span>
                        </small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            mostrarBotonAcccionBorrar() && (
                                <NavLink
                                    onClick={() => onBorrar(tareaExterna.id_tarea_externa)} 
                                    className="link-danger"
                                >
                                    <small>
                                        <FaTrashAlt />
                                        <span className="align-middle ms-1">
                                            {textoBorrar}
                                        </span>
                                    </small>
                                </NavLink>
                            )
                        }
                        {
                            mostrarBotonAccionForward() && (
                                <NavLink
                                    onClick={() => onForward(tareaExterna.id_tarea_externa)} 
                                    className="link-secondary"
                                >
                                    <small>
                                        <FaShareSquare />
                                        <span className="align-middle ms-1">
                                            {textoForward}
                                        </span>
                                    </small>
                                </NavLink>
                            )
                        }
                        {
                            mostrarBotonAccionContinuar() && (
                                <NavLink
                                    onClick={handleContinuar}
                                    className="link-primary ms-2"
                                >
                                    <small>
                                        <span className="align-middle">
                                            <FaCheck className="me-1"/> 
                                            {textoContinuar}
                                        </span>
                                    </small>
                                </NavLink>
                            )
                        }
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default TareaExterna
