import { Form, Spinner } from 'react-bootstrap'

import { useTareasExternas } from '../../context/TareasExternasContext'
import { useQuery } from 'react-query'
import { fetchSucursales, QUERY_SUCURSALES } from '../../queries/Sucursal'

const SucursalSelect = ({onChange, name, value, label, filtraSucursalActual, isInvalid }) => {
    const { data: sucursales, isLoading } = useQuery(QUERY_SUCURSALES, fetchSucursales, { staleTime: Infinity, cacheTime: Infinity})
    const { sucursalActual } = useTareasExternas()

    if (isLoading) return <Spinner animation="border" />

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select
                onChange={onChange}
                value={value}
                name={name}
                isInvalid={isInvalid}
            >
                <option key={0} value={0}>Selecciona una...</option>
                {
                    sucursales.filter(sucursal => (!filtraSucursalActual || parseInt(sucursal.id_sucursal) !== parseInt(sucursalActual)))
                                   .map(sucursal => (
                        <option key={parseInt(sucursal.id_sucursal)} value={parseInt(sucursal.id_sucursal)}>{sucursal.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default SucursalSelect
