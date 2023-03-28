import { Button, Card, Col } from "react-bootstrap"
import { FaArrowAltCircleRight, FaTrashAlt, FaCheck, FaRegCalendarAlt, FaTicketAlt } from 'react-icons/fa'

import { useAuth } from "../../hooks/useAuth"
import { STATUS_TAREA, TIPOS_SERVICIO, useTareasExternas } from "../../context/TareasExternasContext"
import { formateaFecha, formateaFechaHora } from '../comun/utils'

const TareaExterna = ({tareaExterna, tituloContinuar, tituloBorrar, onContinuar, onBorrar }) => {
    const { estadoActual } = useTareasExternas()
    const { esMaquila, esEncargado, esChofer, credenciales } = useAuth()

    function mostrarBotonAccionContinuar() {
        if (!tituloContinuar)
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
        if (!tituloBorrar)
            return false

        return (
            parseInt(estadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION && 
            parseInt(tareaExterna.creado_por.id_usuario) === parseInt(credenciales.id_usuario) &&
            esEncargado()
        )
    }

    return (
        <Col>
            <Card border={parseInt(tareaExterna.tipo_servicio.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
                <Card.Header>
                    <Card.Subtitle className="text-primary">{tareaExterna.estado_tarea.nombre}</Card.Subtitle>
                    <div className="d-flex justify-content-between align-items-center">
                        {/* <Card.Title>Ticket: {tareaExterna.ticket.padStart(6, '0')}</Card.Title> */}
                        <Card.Title><FaTicketAlt /> {tareaExterna.ticket.padStart(6, '0')}</Card.Title>
                        <Card.Subtitle>
                            { tareaExterna.sucursal_origen.nombre }
                            { " " } <FaArrowAltCircleRight /> { " " }
                            { tareaExterna.sucursal_destino.nombre }
                        </Card.Subtitle>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <small>{formateaFecha(tareaExterna.fecha_creacion)}</small>
                        <small>{tareaExterna.creado_por.nombre}</small>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                        {tareaExterna.tipo_trabajo.nombre} { " - "}
                        {tareaExterna.tipo_servicio.nombre}
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
                                        variant='danger'>
                                        <FaTrashAlt />
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
                                    variant={parseInt(tareaExterna.tipo_servicio.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : 'primary'}
                                >
                                    <FaCheck />
                                    {/* {tituloContinuar} */}
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
