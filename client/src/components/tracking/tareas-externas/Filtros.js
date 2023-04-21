import { Form, Nav, Navbar /* , Offcanvas */ } from "react-bootstrap"

import { useTareasExternas } from "../../../context/TareasExternasContext"

import SucursalesDropDown from "../../comun/SucursalesDropDown"
import EstadosTareaDropDown from "../../comun/EstadosTareaDropDown"
import { TAMANO_CONTROLES } from "../../comun/utils"
import TicketInput from "../../comun/TicketInput"

const Filtros = () => {
    const { 
        estadoActual, 
        setEstadoActual,
        ticketFiltro,
        setTicketFiltro,
        sucursalFiltro,
        setSucursalFiltro
    } = useTareasExternas()

    return (
        <Navbar className="mb-1">
            <Nav className="flex-grow-1 pe-3 align-items-center">
                <Form>
                    <TicketInput 
                        size={TAMANO_CONTROLES}
                        type='search'
                        placeholder="Ticket..."
                        aria-label="Search"
                        value={ticketFiltro}
                        onChange={ticketCapturado => setTicketFiltro(ticketCapturado)}
                    />
                </Form>
                <SucursalesDropDown 
                    idSelected={sucursalFiltro} 
                    titleOption={true}
                    onSelect={sucursalSelected => setSucursalFiltro(sucursalSelected)} 
                />
                <EstadosTareaDropDown
                    idSelected={estadoActual} 
                    onSelect={estadoTareaSelected => setEstadoActual(estadoTareaSelected)}
                />
            </Nav>
        </Navbar>
    )
}

export default Filtros
