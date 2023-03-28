import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLandmark } from "@fortawesome/free-solid-svg-icons"

import { NavDropdown, Spinner  } from "react-bootstrap"

import { useQuery } from "@apollo/client"
import { GET_SUCURSALES } from "../../queries/Sucursal"

import { nombreSucursal } from "./utils"

const SucursalesDropDown = ({onSelect, titleOption, showIcon, idSelected}) => {
  const { data, loading } = useQuery(GET_SUCURSALES)

  if (loading) return <Spinner animation="border" />

  return (
    <NavDropdown title={
      <span>
        { showIcon && (<FontAwesomeIcon icon={faLandmark} />) } {nombreSucursal(data.sucursales, idSelected)}
      </span>
    }>
    {
      titleOption && (
        <NavDropdown.Item
          key={0}
          onClick={() => onSelect(0)}
        >
          Sucursal
        </NavDropdown.Item>
      )
    }
    {
      // data &&
      data.sucursales.map(sucursal => (
          <NavDropdown.Item 
              key={sucursal.id_sucursal}
              onClick={() => onSelect(sucursal.id_sucursal)}
          >
            {sucursal.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default SucursalesDropDown
