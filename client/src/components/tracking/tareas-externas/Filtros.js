import { Form, Nav, Navbar } from "react-bootstrap"

import { TAMANO_CONTROLES } from "../../comun/utils"
import { useTareasExternas } from "../../../context/TareasExternasContext"

import SucursalesDropDown from "../../comun/SucursalesDropDown"
import EstadosTareaDropDown from "../../comun/EstadosTareaDropDown"
import TicketInput from "../../comun/TicketInput"

const Filtros = () => {
    const { filtros, setFiltros } = useTareasExternas()

    return (
        <Navbar className="mb-1">
            <Nav className="flex-grow-1 pe-3 align-items-center">
                <Form>
                    <TicketInput 
                        size={TAMANO_CONTROLES}
                        type='search'
                        placeholder="Ticket..."
                        aria-label="Search"
                        value={filtros.ticket}
                        onChange={ticketCapturado => setFiltros(prevValue => ({...prevValue, ticket: ticketCapturado}))}
                    />
                </Form>
                <SucursalesDropDown 
                    idSelected={filtros.sucursal} 
                    titleOption={true}
                    onSelect={sucursalSeleccionada => setFiltros(prevValue => ({...prevValue, sucursal: sucursalSeleccionada}))}
                />
                <EstadosTareaDropDown
                    idSelected={filtros.estado} 
                    onSelect={estadoTareaSeleccionado => setFiltros(prevValue => ({...prevValue, estado: estadoTareaSeleccionado}))}
                />
            </Nav>
        </Navbar>
    )
}

export default Filtros
