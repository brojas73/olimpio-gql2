import { Card, Col, Modal, Spinner} from "react-bootstrap"
import { FaTicketAlt, FaArrowAltCircleRight, FaRegCalendarAlt } from 'react-icons/fa'

import { TIPOS_SERVICIO } from '../../../context/TareasExternasContext'
import { esRedireccionada, FONT_SIZE_DROPDOWN, formateaFecha, formateaFechaHora } from "../../comun/utils"

import { useQuery } from 'react-query'
import { fetchTareaExterna, QUERY_TAREA_EXTERNA } from '../../../queries/TareaExterna'

const TareaExternaModal = ({mostrar, idTareaExterna, onClose}) => {
  const { data, isLoading } = useQuery(
    [QUERY_TAREA_EXTERNA, idTareaExterna], 
    fetchTareaExterna
  )

  if (isLoading) return <Spinner animation="border" />

  // Obtengo el primer elemento del resultado
  const tareaExterna = data[0]

  return (
    <Modal show={mostrar} onHide={onClose} animation={true}> 
      <Modal.Body>
        <Col>
          <Card border={parseInt(tareaExterna.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
              <Card.Header>
                  <Card.Subtitle className="text-primary" style={{fontSize: `${FONT_SIZE_DROPDOWN}`}}>{tareaExterna.estado_tarea}</Card.Subtitle>
                  <div className="d-flex justify-content-between align-items-center">
                        <Card.Subtitle style={{fontSize: `${FONT_SIZE_DROPDOWN}`}}>
                            <FaTicketAlt className="me-1"/> 
                            <span className="align-middle">
                                {tareaExterna.ticket.padStart(6, '0')}
                            </span>
                        </Card.Subtitle>
                        <Card.Subtitle style={{fontSize: `${FONT_SIZE_DROPDOWN}`}}>
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
                    <div className="d-flex justify-content-between align-items-center" style={{fontSize: `${FONT_SIZE_DROPDOWN}`}}>
                        <small>{formateaFecha(tareaExterna.fecha_creacion)}</small>
                        <small>{tareaExterna.creado_por}</small>
                    </div>
              </Card.Header>
              <Card.Body style={{fontSize: `${FONT_SIZE_DROPDOWN}`}}>
                    <Card.Subtitle style={{fontSize: `${FONT_SIZE_DROPDOWN}`}}>
                        {tareaExterna.tipo_trabajo} { " - "}
                        {tareaExterna.tipo_servicio}
                    </Card.Subtitle>
                    <Card.Text>
                        {tareaExterna.descripcion}
                    </Card.Text>
                </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center" style={{fontSize: `${FONT_SIZE_DROPDOWN}`}}>
                <div>
                  <small><FaRegCalendarAlt /> {formateaFechaHora(tareaExterna.fecha_requerida, tareaExterna.hora_requerida)}</small>
                </div>
              </Card.Footer>
          </Card>
        </Col>
      </Modal.Body>
    </Modal>
  )
}

export default TareaExternaModal
