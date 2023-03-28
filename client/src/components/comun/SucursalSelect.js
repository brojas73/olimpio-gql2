import { useQuery } from '@apollo/client'
import { Form, Spinner } from 'react-bootstrap'
import { useTareasExternas } from '../../context/TareasExternasContext'
import { GET_SUCURSALES } from '../../queries/Sucursal'

const SucursalSelect = ({onChange, name, value, label, filtraSucursalActual }) => {
    const { data, loading } = useQuery(GET_SUCURSALES)
    const { sucursalActual } = useTareasExternas()

    if (loading) return <Spinner animation="border" />

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
                    data.sucursales.filter(sucursal => (!filtraSucursalActual || parseInt(sucursal.id_sucursal) !== parseInt(sucursalActual)))
                                   .map(sucursal => (
                        <option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>{sucursal.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default SucursalSelect
