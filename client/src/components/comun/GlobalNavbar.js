import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

import { useOlimpio } from "../../context/OlimpioContext"
import { useAuth } from "../../hooks/useAuth"

import SucursalesDropDown from "./SucursalesDropDown"
import UsuarioDropDown from "./UsuarioDropDown"

const GlobalNavbar = ({onLogout}) => {
    const { conectado, sucursalActual, setSucursalActual  } = useOlimpio()
    const { getUsuario } = useAuth()

    return (
        <Navbar bg="dark" variant="dark" className="mb-2 sticky-top"> 
            <Navbar.Brand as={Link} to="/" className="ms-2">Olimpio</Navbar.Brand>
            {
                conectado && ( 
                    <Nav className="justify-content-end flex-grow-1 me-1">
                        <SucursalesDropDown idSelected={sucursalActual} onSelect={setSucursalActual} showIcon={true} />
                        <UsuarioDropDown title={getUsuario()} onLogout={onLogout}/>
                    </Nav>
                )
            }
            {
                !conectado && (
                    <Nav className="justify-content-end flex-grow-1 me-1">
                        <Nav.Link href="/login" className="olimpio-font-size">Login</Nav.Link>
                    </Nav>
                )
            }
        </Navbar>
    )
}

export default GlobalNavbar
