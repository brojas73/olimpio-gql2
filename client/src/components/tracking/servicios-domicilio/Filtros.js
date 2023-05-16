import { Form, Nav, Navbar /*, Offcanvas */ } from "react-bootstrap"

import { TAMANO_CONTROLES } from "../../comun/utils"
import { useServiciosDomicilio } from "../../../context/ServiciosDomicilioContext"

import TicketInput from "../../comun/TicketInput"
import EstadosServicioDomicilioDropDown from "./EstadosServicioDomicilioDropDown"

const Filtros = () => {
    const { filtros, setFiltros } = useServiciosDomicilio()

    return (
        <Navbar className="mb-3">
            <Nav className="flex-grow-1 pe-3 align-items-center">
                <Form>
                    <TicketInput
                        size={TAMANO_CONTROLES}
                        value={filtros.ticket}
                        type='search'
                        placeholder="Ticket..." 
                        onChange={ticketCapturado => setFiltros(prevValue => ({...prevValue, ticket: ticketCapturado}))}
                    />
                </Form>
                <EstadosServicioDomicilioDropDown
                    idSelected={filtros.estado} 
                    onSelect={estadoSeleccionado => setFiltros(prevValue => ({...prevValue, estado: estadoSeleccionado}))}
                />
            </Nav>
        </Navbar>
    )
}

export default Filtros
