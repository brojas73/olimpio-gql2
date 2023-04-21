import { useNavigate } from 'react-router-dom'
import { Col, Form, Nav, Navbar, /* Offcanvas, */ Row } from "react-bootstrap"

import { useConsultas } from "../../../context/ConsultasContext"

import TicketInput from '../../comun/TicketInput'
import TipoConsultaSelect from "./TipoConsultaSelect"

import { TAMANO_CONTROLES, TIPO_CONSULTA_TE } from '../../comun/utils'

const Filtros = ({onChange}) => {
  const navigate = useNavigate()
  const { 
    setTipoConsultaActual,
    ticketFiltro,
    setTicketFiltro,
    descripcionFiltro,
    setDescripcionFiltro
  } = useConsultas() 

  function handleSelectTipoConsulta(seleccion) {
    setTipoConsultaActual(seleccion)

    switch (parseInt(seleccion)) {
      case TIPO_CONSULTA_TE.POR_ATENDERSE_HOY:
        return navigate('/consultas/tareas-externas/por-atenderse-hoy')
      case TIPO_CONSULTA_TE.BITACORA:
        return navigate('/consultas/tareas-externas/bitacora')
      default:
        navigate('/consultas/tareas-externas')
    }
  }

  function handleOnChange(e) {
    setDescripcionFiltro(e.target.value.toUpperCase())
    onChange({name: e.target.name, value: e.target.value.toUpperCase()})
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
                name='ticket'
                placeholder="Ticket..."
                aria-label="Search"
                value={ticketFiltro}
                onChange={ticketCapturado => setTicketFiltro(ticketCapturado)}
              />
            </Form.Group>
            <Form.Group as={Col} className="ps-0">
              <Form.Control
                size={TAMANO_CONTROLES}
                type='search'
                name='descripcion'
                placeholder="Descripción..."
                aria-label="Search"
                value={descripcionFiltro}
                onChange={handleOnChange}
              />
            </Form.Group> 
          </Row>
        </Form>
        <TipoConsultaSelect onSelect={handleSelectTipoConsulta}/>
      </Nav>
    </Navbar>
  )
}

export default Filtros
