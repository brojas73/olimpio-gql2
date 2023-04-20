import { useNavigate } from 'react-router-dom'
import { Col, Form, Nav, Navbar, Offcanvas, Row } from "react-bootstrap"

import { useTareasExternas } from "../../../context/TareasExternasContext"

import TipoConsultaSelect from "./TipoConsultaSelect"
import { TIPO_CONSULTA_TE } from '../../comun/utils'

const Filtros = ({onChange}) => {
  const navigate = useNavigate()
  const { 
    setTipoConsultaActual,
    ticketFiltro,
    descripcionFiltro,
    setTicketFiltro,
    setDescripcionFiltro
  } = useTareasExternas() 

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
    if (e.target.name === 'ticket')
      setTicketFiltro(e.target.value.toUpperCase())
    else
      setDescripcionFiltro(e.target.value.toUpperCase())

    onChange({name: e.target.name, value: e.target.value.toUpperCase()})
  }

  return (
    <Navbar expand='sm' className="mb-3">
      <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
      <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
        <Offcanvas.Header closeButton>Filtros</Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-grow-1 pe-3 align-items-center">
            <Form>
              <Row>
                <Form.Group as={Col}>
                  <Form.Control
                    size="sm"
                    type='search'
                    name='ticket'
                    placeholder="Ticket..."
                    aria-label="Search"
                    value={ticketFiltro}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group as={Col} className="ps-0">
                  <Form.Control
                    size="sm"
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
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  )
}

export default Filtros
