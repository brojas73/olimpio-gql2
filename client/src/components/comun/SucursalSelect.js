import { Form, Spinner } from 'react-bootstrap'

import { useTareasExternas } from '../../context/TareasExternasContext'
import { useQuery } from 'react-query'
import { fetchSucursales, QUERY_SUCURSALES } from '../../queries/Sucursal'

const SucursalSelect = ({onChange, name, value, label, filtraSucursalActual }) => {
    const { data: sucursales, isLoading } = useQuery(QUERY_SUCURSALES, fetchSucursales, { staleTime: Infinity, cacheTime: Infinity})
    const { sucursalActual } = useTareasExternas()

    if (isLoading) return <Spinner animation="border" />

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select required
                onChange={onChange}
                value={value}
                name={name}
            >
                <option key={0} value="">Selecciona una...</option>
                {
                    sucursales.filter(sucursal => (!filtraSucursalActual || parseInt(sucursal.id_sucursal) !== parseInt(sucursalActual)))
                                   .map(sucursal => (
                        <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default SucursalSelect
