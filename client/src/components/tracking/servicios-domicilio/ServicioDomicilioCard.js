import { Card, Col, NavLink } from "react-bootstrap"
import { FaCheck, FaRegCalendarAlt, FaTicketAlt, FaTruck, FaUserAlt, FaPhoneAlt, FaDollarSign, FaClipboardList, FaStickyNote } from 'react-icons/fa'
import { faLandmark, faLocationDot, faHouse, faPencil, faBan } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "../../../hooks/useAuth"

import { STATUS_SERVICIO_DOMICILIO, useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

import { formateaFecha, formateaFechaHora, esEntrega, esRecoleccion, pagado, servicioActivo } from '../../comun/utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ServicioDomicilio = ({
    servicioDomicilio, 
    textoContinuar, 
    onContinuar, 
    onCancelar,
    onEditarInformacionPago, 
    onLog, 
    onCambiarFecha,
    onEditarInformacionGeneral 
}) => {

    const { estadoActual } = useServiciosDomicilio()
    const { esEncargado, esChofer } = useAuth()

    function mostrarBotonAccionContinuar() {
        if (!textoContinuar)
            return false

        switch (parseInt(estadoActual)) {
            case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE: 
                return esChofer()
            case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
                return esChofer()
            case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
                return esEncargado()
            case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
                return esChofer()
            case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
                return esChofer()
            case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
                return esChofer()
            default:
                break
        }
    }

    function mostrarBotonAcccionCancelar() {
        return (
            (
                parseInt(servicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.TERMINADO && 
                parseInt(servicioDomicilio.id_estado_servicio_domicilio) !== STATUS_SERVICIO_DOMICILIO.CANCELADO
            ) && 
            esEncargado()
        )
    }


    return (
        <Col>
            <Card >
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Subtitle className="text-primary ">
                            {servicioDomicilio.estado_servicio_domicilio}
                        </Card.Subtitle>
                        <div className="d-flex justify-content-between">
                            <NavLink 
                                onClick={() => onLog(servicioDomicilio.id_servicio_domicilio)}
                                className="link-dark"
                            >
                                <small>
                                    <FaClipboardList className="me-1"/> 
                                    <span className="align-middle">
                                        Log
                                    </span>
                                </small>
                            </NavLink>
                            {
                                esEncargado() && (
                                    <NavLink
                                        onClick={() => onEditarInformacionPago(servicioDomicilio.id_servicio_domicilio)}
                                        className="link-success ms-2"
                                    >
                                        <small>
                                            <FaDollarSign /> 
                                            <span className="align-middle">
                                                {
                                                    pagado(servicioDomicilio) ? 'Pagado' : 'Pago'
                                                }
                                            </span>
                                        </small>
                                    </NavLink>
                                )
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <Card.Subtitle>
                            {`${servicioDomicilio.tipo_servicio_descripcion} `}
                            {
                                esEntrega(servicioDomicilio) ? <FaTruck /> : <FaTruck className="fa-flip-horizontal"/>
                            }
                        </Card.Subtitle>
                        <Card.Subtitle>
                            <FontAwesomeIcon icon={faLandmark} /> { servicioDomicilio.sucursal }
                        </Card.Subtitle>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <small>{formateaFecha(servicioDomicilio.fecha_creacion)}</small>
                        <small>{servicioDomicilio.creado_por}</small>
                    </div>
                </Card.Header>
                <Card.Body>
                    {
                        esEntrega(servicioDomicilio) && esEncargado() ? (
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Text className="mb-0"><FaTicketAlt /> {servicioDomicilio.ticket?.padStart(6, '0')} </Card.Text>
                                <span></span>
                                <NavLink 
                                    onClick={() => onEditarInformacionGeneral(servicioDomicilio.id_servicio_domicilio)}
                                    className="link-primary"
                                >
                                    <small>
                                        <FontAwesomeIcon icon={faPencil} className="me-1"/> 
                                        <span> 
                                            Editar 
                                        </span>
                                    </small>
                                </NavLink>
                            </div>
                        ) : esEntrega(servicioDomicilio) && !esEncargado() && (
                            <Card.Text className="mb-0"><FaTicketAlt /> {servicioDomicilio.ticket?.padStart(6, '0')} </Card.Text>
                        )
                    }
                    {
                        esRecoleccion(servicioDomicilio) && esEncargado() ? (
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Text className="mb-0">
                                    <FaUserAlt /> {servicioDomicilio.nombre} 
                                </Card.Text>
                                <NavLink 
                                    className="link-primary"
                                    onClick={() => onEditarInformacionGeneral(servicioDomicilio.id_servicio_domicilio)}
                                >
                                    <small>
                                        <FontAwesomeIcon icon={faPencil} className="me-1"/>
                                        <span>
                                            Editar
                                        </span>
                                    </small>
                                </NavLink>
                            </div>
                        ) : (
                            <Card.Text className="mb-0">
                                <FaUserAlt /> {servicioDomicilio.nombre} 
                            </Card.Text>
                        )
                    }
                    <Card.Text className="mb-0">
                        <FontAwesomeIcon icon={faHouse} /> {servicioDomicilio.direccion}
                    </Card.Text>
                    {
                        servicioDomicilio.colonia && (
                            <Card.Text className="mb-0 ms-4"> COL. {servicioDomicilio.colonia}</Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.municipio && (
                            <Card.Text className="mb-0 ms-4">DEL. {servicioDomicilio.municipio}</Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.cp && (
                            <Card.Text className="mb-0 ms-4">C.P. {servicioDomicilio.cp}</Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.ubicacion && (
                            <Card.Text className="mb-0">
                                <FontAwesomeIcon icon={faLocationDot} /> {servicioDomicilio.ubicacion}
                            </Card.Text>
                        )
                    }
                    <Card.Text className="mb-0">
                        <FaPhoneAlt /> {servicioDomicilio.telefono}
                    </Card.Text>
                    {
                        esEntrega(servicioDomicilio) && servicioDomicilio.forma_pago && (
                            <Card.Text className="mb-0 mt-4 text-success">
                                <FaDollarSign /> 
                                {servicioDomicilio.forma_pago?.toUpperCase()} 
                            </Card.Text>
                        )
                    }
                    {
                        esEntrega(servicioDomicilio) && servicioDomicilio.notas_pago && (
                            <Card.Text className="mb-0 text-success">
                                <FaStickyNote /> 
                                {servicioDomicilio.notas_pago} 
                            </Card.Text>
                        )
                    }
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <div>
                    {
                        // Si aún se pude acutalizar la fecha de entrega, pongo un botón para modificarla, en otro
                        // caso, sólo pongo la información de la fecha de entrega
                        servicioActivo(servicioDomicilio) && esEncargado() ? (
                            <NavLink 
                                onClick={() => onCambiarFecha(servicioDomicilio.id_servicio_domicilio)}
                                className="link-primary"
                            >
                                <small>
                                    <FaRegCalendarAlt className="me-1"/> 
                                    <span className="align-middle">
                                        {formateaFechaHora(servicioDomicilio.fecha_requerida, servicioDomicilio.hora_requerida)}
                                    </span>
                                </small>
                            </NavLink>
                        ) : (
                            <small className="align-middle">
                                <FaRegCalendarAlt className="me-1"/> 
                                {formateaFechaHora(servicioDomicilio.fecha_requerida, servicioDomicilio.hora_requerida)}
                            </small>
                        )
                    }
                    </div>
                    <div className="d-flex justify-content-between">
                        {
                            mostrarBotonAcccionCancelar() && (
                                <NavLink 
                                    onClick={() => onCancelar(servicioDomicilio.id_servicio_domicilio)} 
                                    className="link-danger"
                                >
                                    <small>
                                        <FontAwesomeIcon icon={faBan} className="me-1"/>
                                        Cancelar
                                    </small>
                                </NavLink>
                            )
                        }
                        {
                            mostrarBotonAccionContinuar() && (
                                <NavLink 
                                    onClick={() => onContinuar(servicioDomicilio.id_servicio_domicilio)}
                                    className="link-primary ms-2"
                                >
                                    <small>
                                        <FaCheck className="me-1"/> 
                                        {textoContinuar}
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

export default ServicioDomicilio
