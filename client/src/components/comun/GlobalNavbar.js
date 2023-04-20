import { Link } from "react-router-dom"
import { Navbar, Offcanvas, Nav } from "react-bootstrap"

import { useTareasExternas } from '../../context/TareasExternasContext'
import { useAuth } from "../../hooks/useAuth"

import SucursalesDropDown from "./SucursalesDropDown"
import UsuarioDropDown from "./UsuarioDropDown"

const GlobalNavbar = ({onLogout}) => {
    const { conectado, sucursalActual, setSucursalActual  } = useTareasExternas()
    const { getUsuario } = useAuth()

    return (
        <Navbar bg="dark" variant="dark" expand='sm' className="mb-3 sticky-top"> 
            <Navbar.Brand as={Link} to="/" className="mx-3">Olimpio</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm"/>
            <Navbar.Offcanvas aria-labelledby="offcanvasNavbarLabel-expand-sm">
                <Offcanvas.Header closeButton>Olimpio</Offcanvas.Header>
                {
                    conectado && ( 
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 me-3">
                                <SucursalesDropDown idSelected={sucursalActual} onSelect={setSucursalActual} showIcon={true} />
                                <UsuarioDropDown title={getUsuario()} onLogout={onLogout}/>
                            </Nav>
                        </Offcanvas.Body>
                    )
                }
                {
                    !conectado && (
                        <Nav className="justify-content-end flex-grow-1 me-3">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    )
                }
            </Navbar.Offcanvas>
        </Navbar>
    )
}

export default GlobalNavbar
