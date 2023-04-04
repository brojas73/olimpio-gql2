import { Button, Card, Col } from "react-bootstrap"
import { FaTrashAlt, FaCheck, FaRegCalendarAlt, FaTicketAlt, FaTruck, FaUserAlt, FaPhoneAlt, FaDollarSign, FaClipboardList } from 'react-icons/fa'
import { faLandmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "../../../hooks/useAuth"

import { STATUS_SERVICIO_DOMICILIO, useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

import { formateaFecha, formateaFechaHora, esEntrega, pagado } from '../../comun/utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ServicioDomicilio = ({servicioDomicilio, textoContinuar, textoBorrar, onContinuar, onBorrar, onInformacionPago, onLog }) => {
    const { estadoSDActual } = useServiciosDomicilio()
    const { esEncargado, esChofer, credenciales } = useAuth()

    function mostrarBotonAccionContinuar() {
        if (!textoContinuar)
            return false

        switch (parseInt(estadoSDActual)) {
            case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE: 
                return esChofer()
            case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
                return esEncargado()
            case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
                return esEncargado()
            case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
                return esChofer()
            case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
                return esEncargado()
            case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
                return esChofer()
            default:
                break
        }
    }

    function mostrarBotonAcccionBorrar() {
        if (!textoBorrar)
            return false

        return (
            (
                parseInt(estadoSDActual) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE || 
                parseInt(estadoSDActual) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL
            ) && 
            parseInt(servicioDomicilio.id_creado_por) === parseInt(credenciales.id_usuario) &&
            esEncargado()
        )
    }

    return (
        <Col>
            <Card >
                <Card.Header>
                    <Card.Subtitle className="text-primary d-flex justify-content-between align-items-center">
                        {servicioDomicilio.estado_servicio_domicilio}
                        <div>
                            <Button 
                                variant='outline-dark'
                                size="sm"
                                onClick={() => onLog(servicioDomicilio.id_servicio_domicilio)} 
                                >
                                <FaClipboardList /> 
                                <span> </span>
                                <span className="align-middle">
                                    Log
                                </span>
                            </Button>
                            <span> </span>
                            {
                                esEncargado() && (
                                    <Button 
                                        size="sm"
                                        variant="outline-success"
                                        onClick={() => onInformacionPago(servicioDomicilio.id_servicio_domicilio)}
                                    >
                                        <FaDollarSign /> 
                                        <span> </span>
                                        <span className="align-middle">
                                            {
                                                pagado(servicioDomicilio) ? 'Pagado' : 'Pago'
                                            }
                                        </span>
                                    </Button>
                                )
                            }
                        </div>
                    </Card.Subtitle>
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
                        esEntrega(servicioDomicilio) && (
                            <Card.Text className="mb-0"><FaTicketAlt /> {servicioDomicilio.ticket.padStart(6, '0')}</Card.Text>
                        )
                    }
                    <Card.Text className="mb-0">
                        <FaUserAlt /> {servicioDomicilio.nombre} 
                    </Card.Text>
                    <Card.Text className="mb-0">
                    <FontAwesomeIcon icon={faLocationDot} /> {servicioDomicilio.direccion}
                    </Card.Text>
                    <Card.Text className="mb-0">
                        <FaPhoneAlt /> {servicioDomicilio.telefono}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <small>
                        <FaRegCalendarAlt /> 
                        <span> </span>
                        <span className="align-middle">
                            {formateaFechaHora(servicioDomicilio.fecha_requerida, servicioDomicilio.hora_requerida)}
                        </span>
                    </small>
                    <div>
                        {
                            mostrarBotonAcccionBorrar() && (
                                <>
                                    <Button 
                                        size="sm" 
                                        onClick={() => onBorrar(servicioDomicilio.id_servicio_domicilio)} 
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
                            mostrarBotonAccionContinuar() && (
                                <Button 
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => onContinuar(servicioDomicilio.id_servicio_domicilio)}
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

export default ServicioDomicilio
