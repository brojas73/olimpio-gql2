import { Form, Spinner } from 'react-bootstrap'

import { useQuery } from 'react-query'
import { fetchTiposServicio } from '../../queries/TipoServicio'

const TipoServicioSelect = ({onChange, name, value, label}) => {
    const { data: tiposServicio, isLoading } = useQuery('tiposServicio', fetchTiposServicio)

    if (isLoading) return <Spinner animation="border" />

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select required
                onChange={onChange}
                value={value}
                name={name}
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
