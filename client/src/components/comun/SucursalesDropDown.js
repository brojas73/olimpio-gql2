import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLandmark } from "@fortawesome/free-solid-svg-icons"

import { NavDropdown, Spinner  } from "react-bootstrap"

import { useQuery } from "react-query"
import { fetchSucursales, QUERY_SUCURSALES } from "../../queries/Sucursal"

import { FONT_SIZE_DROPDOWN, nombreSucursal } from "./utils"

const SucursalesDropDown = ({onSelect, titleOption, showIcon, idSelected}) => {
  const { data: sucursales, isLoading } = useQuery(QUERY_SUCURSALES, fetchSucursales, { staleTime: Infinity, cacheTime: Infinity})

  if (isLoading) return <Spinner animation="border" />

  return (
    <NavDropdown style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }} title={
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
            style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}
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
              style={{ fontSize: `${FONT_SIZE_DROPDOWN}` }}
            >
            {sucursal.nombre}
          </NavDropdown.Item>
      ))
    }
    </NavDropdown>
  )
}

export default SucursalesDropDown
