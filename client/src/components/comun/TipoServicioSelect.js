import { useQuery } from '@apollo/client'
import { Form, Spinner } from 'react-bootstrap'
import { GET_TIPOS_SERVICIO } from '../../queries/TipoServicio'

const TipoServicioSelect = ({onChange, name, value, label}) => {
    const { data, loading } = useQuery(GET_TIPOS_SERVICIO)

    if (loading) return <Spinner animation="border" />

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
                    data.tiposServicio.map(tipoServicio => (
                        <option key={tipoServicio.id_tipo_servicio} value={tipoServicio.id_tipo_servicio}>{tipoServicio.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default TipoServicioSelect
