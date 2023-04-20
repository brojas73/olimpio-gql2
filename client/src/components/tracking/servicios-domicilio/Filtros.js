import { Form, Nav, Navbar /*, Offcanvas */ } from "react-bootstrap"

import { useTareasExternas } from "../../../context/TareasExternasContext"
import { useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

import EstadosServicioDomicilioDropDown from "../../comun/EstadosServicioDomicilioDropDown"
import { TAMANO_CONTROLES } from "../../comun/utils"

const Filtros = () => {
    const { 
        ticketFiltro, 
        setTicketFiltro,
    } = useTareasExternas()

    const { estadoActual, setEstadoActual } = useServiciosDomicilio()

    function onSubmit(event) {
        event.preventDefault()
    }

    return (
        <Navbar /* expand='sm' */ className="mb-3">
            {/* <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/> */}
            {/* <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm"> */}
                {/* <Offcanvas.Header closeButton>Filtros</Offcanvas.Header> */}
                    {/* <Offcanvas.Body> */}
                        <Nav className="flex-grow-1 pe-3 align-items-center">
                            <Form onSubmit={onSubmit}>
                                <Form.Control
                                    size={TAMANO_CONTROLES}
                                    type='search'
                                    placeholder="Ticket..."
                                    aria-label="Search"
                                    value={ticketFiltro}
                                    onChange={e => setTicketFiltro(e.target.value.toUpperCase())}
                                />
                            </Form>
                            <EstadosServicioDomicilioDropDown
                                idSelected={estadoActual} 
                                onSelect={setEstadoActual}
                            />
                        </Nav>
                    {/* </Offcanvas.Body> */}
            {/* </Navbar.Offcanvas> */}
        </Navbar>
    )
}

export default Filtros
