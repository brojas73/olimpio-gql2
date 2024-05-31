import { useNavigate } from 'react-router-dom'
import { Col, Form, Nav, Navbar, Row } from "react-bootstrap"

import { useConsultas } from "../../../context/ConsultasContext"
import { TAMANO_CONTROLES, TIPO_CONSULTA_TE } from '../../comun/utils'

import TicketInput from '../../comun/TicketInput'
import TipoConsultaSelect from "./TipoConsultaSelect"

const Filtros = ({onChange}) => {
  const navigate = useNavigate()
  const { filtros, setFiltros } = useConsultas() 

  function handleSelectTipoConsulta(seleccion) {
    setFiltros(prevValue => ({...prevValue, tipoConsulta: seleccion}))

    switch (parseInt(seleccion)) {
      case TIPO_CONSULTA_TE.POR_ATENDERSE_HOY:
        return navigate('/consultas/tareas-externas/por-atenderse-hoy')
      case TIPO_CONSULTA_TE.TERMINADAS:
        return navigate('/consultas/tareas-externas/terminadas')
      case TIPO_CONSULTA_TE.BITACORA:
        return navigate('/consultas/tareas-externas/bitacora')
      default:
        navigate('/consultas/tareas-externas/por-atenderse-hoy')
    }
  }

  return (
    <Navbar className="mb-3">
      <Nav className="flex-grow-1 pe-3 align-items-center">
        <Form>
          <Row>
            <Form.Group as={Col}>
              <TicketInput 
                size={TAMANO_CONTROLES}
                type='search'
                placeholder="Ticket..."
                aria-label="Search"
                value={filtros.ticket}
                onChange={ticketCapturado => setFiltros(prevValue => ({...prevValue, ticket: ticketCapturado}))}
              />
            </Form.Group>
            <Form.Group as={Col} className="ps-0">
              <Form.Control
                size={TAMANO_CONTROLES}
                type='search'
                placeholder="Descripción..."
                aria-label="Search"
                value={filtros.descripcion}
                onChange={e => setFiltros(prevValue => ({...prevValue, descripcion: e.target.value.toUpperCase()}))}
              />
            </Form.Group> 
          </Row>
        </Form>
        <TipoConsultaSelect 
          selected={filtros.tipoConsulta}
          onSelect={handleSelectTipoConsulta}
        />
      </Nav>
    </Navbar>
  )
}

export default Filtros
