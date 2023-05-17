import { Card, Col, NavLink } from "react-bootstrap"
import { FaClipboardList, FaTrashAlt, FaCheck, FaRegCalendarAlt, FaTicketAlt, FaShareSquare } from 'react-icons/fa'

import { useAuth } from "../../../hooks/useAuth"
import { STATUS_TAREA_LOCAL, TIPOS_SERVICIO, useTareasLocales } from "../../../context/TareasLocalesContext"
import { 
    formateaFecha, 
    formateaFechaHora
} from '../../comun/utils'

const TareaLocal = ({tareaLocal, textoContinuar, textoBorrar, textoForward, onContinuar, onBorrar, onForward, onLog }) => {
    const { filtros } = useTareasLocales()
    const { esEncargado } = useAuth()

    function handleContinuar() {
        onContinuar(tareaLocal)
    }
 
    function mostrarBotonAccionContinuar() {
        if (!textoContinuar)
            return false

        switch (parseInt(filtros.estado)) {
            case STATUS_TAREA_LOCAL.POR_ATENDERSE: 
                return esEncargado()
            case STATUS_TAREA_LOCAL.TERMINADO :
                return esEncargado()
            default:
                return false
        }
    }

    function mostrarBotonAcccionBorrar() {
        if (!textoBorrar)
            return false

        return (
            parseInt(filtros.estado) === STATUS_TAREA_LOCAL.POR_ATENDERSE && 
            esEncargado()
        )
    }

    function mostrarBotonAccionForward() {
        if (!textoForward)
            return false

        return (
            parseInt(filtros.estado) === STATUS_TAREA_LOCAL.POR_ATENDERSE && 
            esEncargado()
        )
    }


    return (
        <Col>
            <Card border={parseInt(tareaLocal.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center olimpio-font-size">
                        <Card.Subtitle className="text-primary olimpio-font-size">
                            {tareaLocal.estado_tarea}
                        </Card.Subtitle>
                        <NavLink 
                            onClick={() => onLog(tareaLocal)} 
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
                                {tareaLocal.ticket.padStart(6, '0')}
                            </span>
                        </Card.Subtitle>
                        <Card.Subtitle className="olimpio-font-size">
                            { tareaLocal.sucursal } 
                        </Card.Subtitle>
                    </div>
                    <div className="d-flex justify-content-between align-items-center olimpio-font-size">
                        <small>{formateaFecha(tareaLocal.fecha_creacion)}</small>
                        <small>{tareaLocal.creado_por}</small>
                    </div>
                </Card.Header>
                <Card.Body className="olimpio-font-size">
                    <Card.Subtitle className="olimpio-font-size">
                        {tareaLocal.tipo_trabajo} { " - "}
                        {tareaLocal.tipo_servicio}
                    </Card.Subtitle>
                    <Card.Text>
                        {tareaLocal.descripcion}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center olimpio-font-size">
                    <div className="text-danger">
                        <small>
                            <FaRegCalendarAlt /> 
                            <span className="align-middle ms-1">
                                {formateaFechaHora(tareaLocal.fecha_requerida, tareaLocal.hora_requerida)}
                            </span>
                        </small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            mostrarBotonAcccionBorrar() && (
                                <NavLink
                                    onClick={() => onBorrar(tareaLocal)} 
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
                                    onClick={() => onForward(tareaLocal)} 
                                    className="link-secondary ms-2"
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

export default TareaLocal
