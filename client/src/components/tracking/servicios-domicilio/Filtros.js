import { Form, Nav, Navbar /*, Offcanvas */ } from "react-bootstrap"

import { TAMANO_CONTROLES } from "../../comun/utils"
import { useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

import TicketInput from "../../comun/TicketInput"
import EstadosServicioDomicilioDropDown from "../../comun/EstadosServicioDomicilioDropDown"

const Filtros = () => {
    const { 
        ticketFiltro, 
        setTicketFiltro,
    } = useServiciosDomicilio()

    const { estadoActual, setEstadoActual } = useServiciosDomicilio()

    function onSubmit(event) {
        event.preventDefault()
    }

    return (
        <Navbar className="mb-3">
            <Nav className="flex-grow-1 pe-3 align-items-center">
                <Form onSubmit={onSubmit}>
                    <TicketInput
                        size={TAMANO_CONTROLES}
                        value={ticketFiltro}
                        type='search'
                        placeholder="Ticket..." 
                        onChange={ticketCapturado => setTicketFiltro(ticketCapturado)}
                    />
                </Form>
                <EstadosServicioDomicilioDropDown
                    idSelected={estadoActual} 
                    onSelect={setEstadoActual}
                />
            </Nav>
        </Navbar>
    )
}

export default Filtros
