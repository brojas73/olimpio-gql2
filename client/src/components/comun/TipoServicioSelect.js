import { Form, Spinner } from 'react-bootstrap'

import { useQuery } from 'react-query'
import { fetchTiposServicio, QUERY_TIPOS_SERVICIO } from '../../queries/TipoServicio'

const TipoServicioSelect = ({onChange, name, value, label, isInvalid}) => {
    const { data: tiposServicio, isLoading } = useQuery(QUERY_TIPOS_SERVICIO, fetchTiposServicio, { staleTime: Infinity, cacheTime: Infinity})

    if (isLoading) return <Spinner animation="border" />

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select
                onChange={onChange}
                value={value}
                name={name}
                isInvalid={ isInvalid }
                >
                <option key={0} value="">Selecciona uno...</option>
                {
                    tiposServicio.map(tipoServicio => (
                        <option key={tipoServicio.id_tipo_servicio} value={tipoServicio.id_tipo_servicio}>{tipoServicio.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default TipoServicioSelect
