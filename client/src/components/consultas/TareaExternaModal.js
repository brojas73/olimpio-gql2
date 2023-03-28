import { Card, Col, Modal, Spinner} from "react-bootstrap"
import { FaArrowAltCircleRight } from 'react-icons/fa'

import { TIPOS_SERVICIO } from '../../context/TareasExternasContext'
import { formateaFecha, formateaFechaHora } from "../comun/utils"

import { useQuery } from '@apollo/client'
import { GET_TAREA_EXTERNA_BY_ID} from '../../queries/TareaExterna'

const TareaExternaModal = ({mostrar, idTareaExterna, onClose}) => {
  const { data, loading } = useQuery(GET_TAREA_EXTERNA_BY_ID, { variables: { id_tarea_externa: idTareaExterna }})

  if (loading) return <Spinner animation="border" />

  return (
    <Modal show={mostrar} onHide={onClose} animation={true}> 
      <Modal.Body>
        <Col>
          <Card border={parseInt(data.tareaExterna.tipo_servicio.id_tipo_servicio) === TIPOS_SERVICIO.EXPRESS ? 'danger' : ''} >
              <Card.Header>
                  <Card.Subtitle className="text-primary">{data.tareaExterna.estado_tarea.nombre}</Card.Subtitle>
                  <div className="d-flex justify-content-between align-items-center">
                      <Card.Title>Ticket: {data.tareaExterna.ticket.padStart(6, '0')}</Card.Title>
                      <Card.Subtitle>
                      { data.tareaExterna.sucursal_origen.nombre }
                      { " " } <FaArrowAltCircleRight /> { " " }
                      { data.tareaExterna.sucursal_destino.nombre }
                      </Card.Subtitle>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                      <small>{formateaFecha(data.tareaExterna.fecha_creacion)}</small>
                      <small>{data.tareaExterna.creado_por.nombre}</small>
                  </div>
              </Card.Header>
              <Card.Body>
                  <Card.Subtitle>
                      { data.tareaExterna.tipo_trabajo.nombre } { " - "}
                      { data.tareaExterna.tipo_servicio.nombre }
                  </Card.Subtitle>
                  <Card.Text>
                      { data.tareaExterna.descripcion }
                  </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div>
                    <small>Entregar: { formateaFechaHora(data.tareaExterna.fecha_requerida, data.tareaExterna.hora_requerida)}</small>
                </div>
              </Card.Footer>
          </Card>
        </Col>
      </Modal.Body>
    </Modal>
  )
}

export default TareaExternaModal
