import { Link } from "react-router-dom"
import { Navbar, Offcanvas, Nav, NavDropdown } from "react-bootstrap"

import { useTareasExternas } from '../../context/TareasExternasContext'
import { useAuth } from "../../hooks/useAuth"

import SucursalesDropDown from "./SucursalesDropDown"
import UsuarioDropDown from "./UsuarioDropDown"


const GlobalNavbar = ({onLogout}) => {
    const { conectado, sucursalActual, setSucursalActual  } = useTareasExternas()
    const { getUsuario } = useAuth()

    function handleOnSelect() {
        console.log('GlobalNavbar.handlerOnSelect')
    }

    return (
        <Navbar bg="dark" variant="dark" expand='md' className="mb-3"> 
            <Navbar.Brand as={Link} to="/" className="mx-3">Olimpio</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
            <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                <Offcanvas.Header closeButton>Olimpio</Offcanvas.Header>
                {
                    conectado && (
                        <Offcanvas.Body>
                            <Nav className="justify-content-start flex-grow-1 pe-3">
                                <NavDropdown title="Tracking">
                                    <NavDropdown.Item as={Link} onSelect={handleOnSelect} to='/tracking/tareas-activas'>Tareas Externas</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/servicios-domicilio/servicios-activos'>Servicios a Domicilio</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Consultas">
                                    <NavDropdown.Item as={Link} to='/consultas/tareas-por-atenderse-hoy'>Tareas para Hoy</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/consultas/bitacora'>Bitácora</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <SucursalesDropDown idSelected={sucursalActual} onSelect={setSucursalActual} showIcon={true} />
                                <UsuarioDropDown title={getUsuario()} onLogout={onLogout}/>
                            </Nav>
                        </Offcanvas.Body>
                    )
                }
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default GlobalNavbar
