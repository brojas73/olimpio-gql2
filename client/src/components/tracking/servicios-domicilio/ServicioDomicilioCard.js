import { Button, Card, Col, Nav, NavLink } from "react-bootstrap"
import { FaCheck, FaRegCalendarAlt, FaTicketAlt, FaTruck, FaUserAlt, FaPhoneAlt, FaDollarSign, FaClipboardList, FaStickyNote } from 'react-icons/fa'
import { faLandmark, faLocationDot, faHouse, faPencil, faBan } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "../../../hooks/useAuth"

import { STATUS_SERVICIO_DOMICILIO, useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

import { formateaFecha, formateaFechaHora, esEntrega, esRecoleccion, pagado, servicioActivo } from '../../comun/utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse"

const ServicioDomicilio = ({
    servicioDomicilio, 
    textoContinuar, 
    textoBorrar, 
    onContinuar, 
    onBorrar, 
    onCancelar,
    onEditarInformacionPago, 
    onLog, 
    onCambiarFecha,
    onEditarInformacionGeneral 
}) => {
    const { estadoSDActual } = useServiciosDomicilio()
    const { esEncargado, esChofer } = useAuth()

    function mostrarBotonAccionContinuar() {
        if (!textoContinuar)
            return false

        switch (parseInt(estadoSDActual)) {
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

    // function mostrarBotonAcccionBorrar() {
    //     if (!textoBorrar)
    //         return false

    //     return (
    //         (
    //             parseInt(estadoSDActual) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE || 
    //             parseInt(estadoSDActual) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL
    //         ) && 
    //         parseInt(servicioDomicilio.id_creado_por) === parseInt(credenciales.id_usuario) &&
    //         esEncargado()
    //     )
    // }

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
                        <div className="d-flex justify-content-between align-items-center">
                            {/* <Button 
                                variant='outline-dark'
                                size="sm"
                                onClick={() => onLog(servicioDomicilio.id_servicio_domicilio)} 
                            > */}
                            <NavLink 
                                onClick={() => onLog(servicioDomicilio.id_servicio_domicilio)}
                                className="link-dark"
                            >
                                <small>
                                    <FaClipboardList /> 
                                    <span> </span>
                                    <span className="align-middle">
                                        Log
                                    </span>
                                </small>
                            </NavLink>
                            {/* </Button> */}
                            &nbsp;&nbsp;
                            {
                                esEncargado() && (
                                    // <Button 
                                    //     size="sm"
                                    //     variant="outline-success"
                                    //     onClick={() => onEditarInformacionPago(servicioDomicilio.id_servicio_domicilio)}
                                    // >
                                    <NavLink
                                        onClick={() => onEditarInformacionPago(servicioDomicilio.id_servicio_domicilio)}
                                        className="link-success"
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
                                    // </Button>
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
                                {/* <Button 
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => onEditarInformacionGeneral(servicioDomicilio.id_servicio_domicilio)}
                                > */}
                                <NavLink 
                                    onClick={() => onEditarInformacionGeneral(servicioDomicilio.id_servicio_domicilio)}
                                    className="link-primary"
                                >
                                    <small>
                                    <FontAwesomeIcon icon={faPencil} /> 
                                    <span> </span>
                                    <span className="align-middle"> Editar </span>
                                    </small>
                                </NavLink>
                                {/* </Button> */}
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
                                {/* <Button 
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => onEditarInformacionGeneral(servicioDomicilio.id_servicio_domicilio)}
                                > */}
                                <NavLink 
                                    className="link-primary"
                                    onClick={() => onEditarInformacionGeneral(servicioDomicilio.id_servicio_domicilio)}
                                >
                                    <small>
                                        <FontAwesomeIcon icon={faPencil} />
                                        <span> </span>
                                        Editar
                                    </small>
                                </NavLink>
                                    {/* <FontAwesomeIcon icon={faPencil} /> 
                                    <span> </span>
                                    <span className="align-middle"> Editar </span> */}
                                {/* </Button> */}
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
                            <Card.Text className="mb-0">
                            &nbsp; &nbsp; &nbsp;COL. {servicioDomicilio.colonia}
                            </Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.municipio && (
                            <Card.Text className="mb-0">
                            &nbsp; &nbsp; &nbsp;DEL. {servicioDomicilio.municipio}
                            </Card.Text>
                        )
                    }
                    {
                        servicioDomicilio.cp && (
                            <Card.Text className="mb-0">
                            &nbsp; &nbsp; &nbsp;C.P. {servicioDomicilio.cp}
                            </Card.Text>
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
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                    {
                        // Si aún se pude acutalizar la fecha de entrega, pongo un botón para modificarla, en otro
                        // caso, sólo pongo la información de la fecha de entrega
                        servicioActivo(servicioDomicilio) && esEncargado() ? (
                            // <Button 
                            //     size="sm" 
                            //     onClick={() => onCambiarFecha(servicioDomicilio.id_servicio_domicilio)} 
                            //     variant='outline-danger'
                            // >
                            <NavLink 
                                onClick={() => onCambiarFecha(servicioDomicilio.id_servicio_domicilio)}
                                className="link-primary"
                            >
                                <small>
                                    <FaRegCalendarAlt /> 
                                    <span className="align-middle">
                                    <span> </span>
                                    {formateaFechaHora(servicioDomicilio.fecha_requerida, servicioDomicilio.hora_requerida)}
                                    </span>
                                </small>
                            </NavLink>
                            // </Button>
                        ) : (
                            <small>
                                <FaRegCalendarAlt /> 
                                <span className="align-middle">
                                    <span> </span>
                                    {formateaFechaHora(servicioDomicilio.fecha_requerida, servicioDomicilio.hora_requerida)}
                                </span>
                            </small>
                )
                    }
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            mostrarBotonAcccionCancelar() && (
                                <>
                                    {/* <Button 
                                        size="sm" 
                                        onClick={() => onCancelar(servicioDomicilio.id_servicio_domicilio)} 
                                        variant='outline-danger'
                                    > */}
                                    <NavLink 
                                        onClick={() => onCancelar(servicioDomicilio.id_servicio_domicilio)} 
                                        className="link-danger"
                                    >
                                        <span className="align-middle">
                                            <small>
                                                <FontAwesomeIcon icon={faBan} />
                                                <span> </span>
                                                Cancelar
                                            </small>
                                        </span>
                                    </NavLink>
                                    {/* </Button> */}
                                    <span> </span>
                                </>
                            )
                        }
                        &nbsp;&nbsp;
                        {
                            mostrarBotonAccionContinuar() && (
                                // <Button 
                                //     size="sm"
                                //     variant="outline-primary"
                                //     onClick={() => onContinuar(servicioDomicilio.id_servicio_domicilio)}
                                // >
                                <NavLink 
                                    onClick={() => onContinuar(servicioDomicilio.id_servicio_domicilio)}
                                    className="link-primary"
                                >
                                    <small>
                                    <span className="align-middle">
                                        <FaCheck /> 
                                        <span> </span>
                                        {textoContinuar}
                                    </span>
                                    </small>
                                </NavLink>
                                // </Button>
                            )
                        }
                    </div>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ServicioDomicilio
