import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faUserPen, faTruck, faStore } from "@fortawesome/free-solid-svg-icons"
import { NavDropdown  } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const UsuarioDropDown = ({onLogout, title}) => {
    const { logout } = useAuth()
    const { esAdmin, esEncargado, esChofer } = useAuth()
    
    function handleLogout() {
        logout()
        onLogout()
    }

    return (
        <NavDropdown title={
            <span>
                <FontAwesomeIcon icon={esAdmin() ? faUserPen : esEncargado() ? faUser : esChofer() ? faTruck : faStore} /> { title }
            </span>
        }>
            <NavDropdown.Item tag={Link} to='/login' onClick={handleLogout}>Salir</NavDropdown.Item>
        </NavDropdown>
    )
}

export default UsuarioDropDown
