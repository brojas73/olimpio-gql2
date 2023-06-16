import { Card, Col, Modal, Spinner} from "react-bootstrap"
import { FaTicketAlt, FaArrowAltCircleRight, FaRegCalendarAlt } from 'react-icons/fa'

import { TIPOS_SERVICIO } from '../../../context/TareasExternasContext'
import { esRedireccionada, formateaFecha, formateaFechaHora } from "../../comun/utils"

import { useQuery } from 'react-query'
import { fetchTareaExterna, QUERY_TAREA_EXTERNA } from '../../../queries/TareaExterna'
import { fetchTareaLocal, QUERY_TAREA_LOCAL } from '../../../queries/TareaLocal'

const TareaModal = ({mostrar, idTarea, onClose, tipoTarea}) => {
  const { data: tareasExternas, isLoading: isLoadingTareasExternas } = useQuery(
    [QUERY_TAREA_EXTERNA, idTarea], 
    fetchTareaExterna
  )

  const { data: tareasLocales, isLoading: isLoadingTareasLocales } = useQuery(
    [QUERY_TAREA_LOCAL, idTarea], 
    fetchTareaLocal
  )

  if (isLoadingTareasExternas || isLoadingTareasLocales) return <Spinner animation="border" />

  // Obtengo el primer elemento del resultado
  const tarea = (tipoTarea === 'E' ? tareasExternas[0] : tareasLocales[0])

  return (
    <Modal show={mostrar} onHide={onClose} animation={true}> 
      <Modal.Body>
        <Col>
          <Card border={parseInt(tarea.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
              <Card.Header>
                  <Card.Subtitle className="text-primary olimpio-font-size">{tarea.estado_tarea}</Card.Subtitle>
                  <div className="d-flex justify-content-between align-items-center">
                        <Card.Subtitle className="olimpio-font-size">
                            <FaTicketAlt className="me-1"/> 
                            <span className="align-middle">
                                {tarea.ticket.padStart(6, '0')}
                            </span>
                        </Card.Subtitle>
                        <Card.Subtitle className="olimpio-font-size">
                            {
                              tipoTarea === 'L' && (
                                <>
                                  { tarea.sucursal } 
                                </>
                              )
                            }
                            {
                              tipoTarea === 'E' && (
                                <>
                                  { tarea.sucursal_origen } <FaArrowAltCircleRight className="mx-1"/> { tarea.sucursal_destino }
                                </>
                              )
                            }
                            {
                              (tipoTarea === 'E' && esRedireccionada(tarea)) && (
                                <>
                                  <FaArrowAltCircleRight className="mx-1"/>{tarea.sucursal_redireccion}
                                </>
                              )
                            }
                        </Card.Subtitle>
                    </div>
                    <div className="d-flex justify-content-between align-items-center olimpio-font-size">
                        <small>{formateaFecha(tarea.fecha_creacion)}</small>
                        <small>{tarea.creado_por}</small>
                    </div>
              </Card.Header>
              <Card.Body className="olimpio-font-size">
                    <Card.Subtitle className="olimpio-font-size">
                      {tarea.tipo_trabajo} { " - "}
                      {tarea.tipo_servicio}
                    </Card.Subtitle>
                    <Card.Text>
                      {tarea.descripcion}
                    </Card.Text>
                </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center olimpio-font-size">
                <div className="text-danger">
                  <small>
                      <FaRegCalendarAlt /> 
                      <span className="align-middle ms-1">
                          {formateaFechaHora(tarea.fecha_requerida, tarea.hora_requerida)}
                      </span>
                  </small>
                </div>
              </Card.Footer>
          </Card>
        </Col>
      </Modal.Body>
    </Modal>
  )
}

export default TareaModal
