import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLandmark } from "@fortawesome/free-solid-svg-icons"

import { NavDropdown, Spinner  } from "react-bootstrap"

import { useQuery } from "react-query"
import { fetchSucursales, QUERY_SUCURSALES } from "../../queries/Sucursal"

import { nombreSucursal } from "./utils"

const SucursalesDropDown = ({onSelect, titleOption, showIcon, idSelected}) => {
  const { data: sucursales, isLoading } = useQuery(QUERY_SUCURSALES, fetchSucursales, { staleTime: Infinity, cacheTime: Infinity})

  if (isLoading) return <Spinner animation="border" />

  return (
    <NavDropdown className="olimpio-font-size" title={
      <span>
        { showIcon && (<FontAwesomeIcon icon={faLandmark} />) } {nombreSucursal(sucursales, idSelected)}
      </span>
    }>
    {
      titleOption && (
        <>
          <NavDropdown.Item
            key={0}
            onClick={() => onSelect(0)}
            className="olimpio-font-size"
          >
            Sucursal
          </NavDropdown.Item>
          <NavDropdown.Divider />
        </>
      )
    }
    {
      sucursales.map(sucursal => (
          <NavDropdown.Item 
              key={sucursal.id_sucursal}
              onClick={() => onSelect(sucursal.id_sucursal)}
              className="olimpio-font-size"
            >
            {sucursal.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default SucursalesDropDown
