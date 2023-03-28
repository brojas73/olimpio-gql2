import { Form, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { useTareasExternas } from "../../context/TareasExternasContext"
import EstadosTareaDropDown from "../comun/EstadosTareaDropDown"

// import EstadosTareaDropDown from "../comun/EstadosTareaDropDown"
import SucursalesDropDown from "../comun/SucursalesDropDown"
// import TiposServicioDropDown from "../comun/TiposServicioDropDown"
// import TiposTrabajoDropDown from "../comun/TiposTrabajoDropDown"

const Filtros = () => {
    const { 
        ticketFiltro, 
        sucursalFiltro, 
        // tipoServicioFiltro, 
        // tipoTrabajoFiltro, 
        estadoActual, 
        setEstadoActual,
        setTicketFiltro,
        setSucursalFiltro
    } = useTareasExternas()

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
                            <SucursalesDropDown 
                                idSelected={sucursalFiltro} 
                                titleOption={true}
                                onSelect={setSucursalFiltro} 
                            />
                            {/* <TiposTrabajoDropDown 
                                title={getTipoTrabajo(tipoTrabajoFiltro)} 
                                titleOption={true}
                                onSelect={asignaTipoTrabajoFiltro} 
                            /> */}
                            {/* <TiposServicioDropDown 
                                title={getTipoServicio(tipoServicioFiltro)} 
                                titleOption={true}
                                onSelect={asignaTipoServicioFiltro} 
                            /> */}
                            <EstadosTareaDropDown
                                idSelected={estadoActual}
                                onSelect={setEstadoActual}
                            />
                        </Nav>
                    </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default Filtros
