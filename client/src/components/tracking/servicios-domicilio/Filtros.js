import { Form, Nav, Navbar, Offcanvas } from "react-bootstrap"

import { useTareasExternas } from "../../../context/TareasExternasContext"
import { useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

import EstadosServicioDomicilioDropDown from "../../comun/EstadosServicioDomicilioDropDown"

const Filtros = () => {
    const { 
        ticketFiltro, 
        setTicketFiltro,
    } = useTareasExternas()

    const { estadoSDActual, setEstadoSDActual } = useServiciosDomicilio()

    function onSubmit(event) {
        event.preventDefault()
    }

    return (
        <Navbar expand='sm' className="mb-3">
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
            <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                <Offcanvas.Header closeButton>Filtros</Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-grow-1 pe-3">
                            <Form onSubmit={onSubmit}>
                                <Form.Control
                                    type='search'
                                    placeholder="Ticket..."
                                    aria-label="Search"
                                    value={ticketFiltro}
                                    onChange={e => setTicketFiltro(e.target.value)}
                                />
                            </Form>
                            <EstadosServicioDomicilioDropDown
                                idSelected={estadoSDActual} 
                                onSelect={setEstadoSDActual}
                            />
                        </Nav>
                    </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default Filtros
