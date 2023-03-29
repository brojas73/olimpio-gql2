import { Col, Form, Navbar, Offcanvas, Row } from "react-bootstrap"

const Filtros = ({ticketFiltro, descripcionFiltro, onChange}) => {
  return (
    <Navbar expand='sm' className="mb-3">
      <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
      <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
        <Offcanvas.Header closeButton>Filtros</Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Control
                  type='search'
                  name='ticket'
                  placeholder="Ticket..."
                  aria-label="Search"
                  value={ticketFiltro}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Control
                  type='search'
                  name='descripcion'
                  placeholder="Descripción..."
                  aria-label="Search"
                  value={descripcionFiltro}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
            </Row>
          </Form>
       </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  )
}

export default Filtros
