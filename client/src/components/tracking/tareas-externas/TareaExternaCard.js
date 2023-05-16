import { Card, Col, NavLink } from "react-bootstrap"
import { FaClipboardList, FaArrowAltCircleRight, FaTrashAlt, FaCheck, FaRegCalendarAlt, FaTicketAlt, FaShareSquare } from 'react-icons/fa'

import { useAuth } from "../../../hooks/useAuth"
import { STATUS_TAREA, TIPOS_SERVICIO, useTareasExternas } from "../../../context/TareasExternasContext"
import { 
    esRedireccionada, 
    esRedireccionadaAMaquila, 
    formateaFecha, 
    formateaFechaHora
} from '../../comun/utils'

const TareaExterna = ({tareaExterna, textoContinuar, textoBorrar, textoForward, onContinuar, onBorrar, onForward, onLog, onRecolectarForwarded }) => {
    const { filtros } = useTareasExternas()
    const { esMaquila, esEncargado, esChofer } = useAuth()

    function handleContinuar() {
        if (esRedireccionada(tareaExterna))
            onRecolectarForwarded(tareaExterna, tareaExterna.id_sucursal_redireccion)
        else
            onContinuar(tareaExterna)
    }
 
    function mostrarBotonAccionContinuar() {
        if (!textoContinuar)
            return false
        
        switch (parseInt(filtros.estado)) {
            case STATUS_TAREA.PENDIENTE_RECOLECCION: 
                return (esChofer() && !esRedireccionadaAMaquila(tareaExterna)) || (esEncargado() && esRedireccionadaAMaquila(tareaExterna))
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
            parseInt(filtros.estado) === STATUS_TAREA.PENDIENTE_RECOLECCION && 
            esEncargado()
        )
    }

    function mostrarBotonAccionForward() {
        if (!textoForward)
            return false

        return (
            parseInt(filtros.estado) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE && 
            esEncargado()
        )
    }

    return (
        <Col>
            <Card border={parseInt(tareaExterna.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center olimpio-font-size">
                        <Card.Subtitle className="text-primary olimpio-font-size">{tareaExterna.estado_tarea}</Card.Subtitle>
                        <NavLink 
                            onClick={() => onLog(tareaExterna)} 
                            className="link-secondary"
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
                        <Card.Subtitle className="olimpio-font-size">
                            <FaTicketAlt className="me-1"/> 
                            <span className="align-middle">
                                {tareaExterna.ticket.padStart(6, '0')}
                            </span>
                        </Card.Subtitle>
                        <Card.Subtitle className="olimpio-font-size">
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
                    <div className="d-flex justify-content-between align-items-center olimpio-font-size">
                        <small>{formateaFecha(tareaExterna.fecha_creacion)}</small>
                        <small>{tareaExterna.creado_por}</small>
                    </div>
                </Card.Header>
                <Card.Body className="olimpio-font-size">
                    <Card.Subtitle className="olimpio-font-size">
                        {tareaExterna.tipo_trabajo} { " - "}
                        {tareaExterna.tipo_servicio}
                    </Card.Subtitle>
                    <Card.Text>
                        {tareaExterna.descripcion}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center olimpio-font-size">
                    <div className="text-danger">
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
                                    onClick={() => onBorrar(tareaExterna)} 
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
                                    onClick={() => onForward(tareaExterna)} 
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
