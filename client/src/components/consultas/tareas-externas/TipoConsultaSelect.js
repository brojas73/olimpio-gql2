import { NavDropdown } from 'react-bootstrap'

import { TIPO_CONSULTA_TE } from "../../comun/utils"

function getTitulo(id) {
    switch (parseInt(id)) {
        case TIPO_CONSULTA_TE.POR_ATENDERSE_HOY:
            return 'Tareas por Atenderse Hoy'
        case TIPO_CONSULTA_TE.BITACORA:
            return 'Bitácora de Tareas Externas'
        default:
            return 'Tipo de Consulta'
    }
}

const TipoConsultaSelect = ({onSelect, selected}) => {
    const titulo = getTitulo(selected)

    function handleSelect(eventKey) {
        onSelect(eventKey)
    }

    return (
        <NavDropdown title={titulo} onSelect={handleSelect} className="olimpio-font-size">
            <NavDropdown.Item 
                key={TIPO_CONSULTA_TE.TIPO_CONSULTA} 
                eventKey={TIPO_CONSULTA_TE.TIPO_CONSULTA}
                className="olimpio-font-size"
            >
                {getTitulo(TIPO_CONSULTA_TE.TIPO_CONSULTA)}
            </NavDropdown.Item>
            
            <NavDropdown.Item 
                key={TIPO_CONSULTA_TE.POR_ATENDERSE_HOY} 
                eventKey={TIPO_CONSULTA_TE.POR_ATENDERSE_HOY}
                className="olimpio-font-size"
            >
                {getTitulo(TIPO_CONSULTA_TE.POR_ATENDERSE_HOY)}
            </NavDropdown.Item>

            <NavDropdown.Item 
                key={TIPO_CONSULTA_TE.BITACORA} 
                eventKey={TIPO_CONSULTA_TE.BITACORA}
                className="olimpio-font-size"
            >
                {getTitulo(TIPO_CONSULTA_TE.BITACORA)}
            </NavDropdown.Item>
        </NavDropdown>
    )
}

export default TipoConsultaSelect
