import { useQuery } from '@apollo/client'
import { Form, Spinner } from 'react-bootstrap'
import { GET_TIPOS_TRABAJO } from '../../queries/TipoTrabajo'

const TipoTrabajoSelect = ({onChange, name, value, label}) => {
    const { data, loading } = useQuery(GET_TIPOS_TRABAJO)

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
                    data.tiposTrabajo.map(tipoTrabajo => (
                        <option key={tipoTrabajo.id_tipo_trabajo} value={tipoTrabajo.id_tipo_trabajo}>{tipoTrabajo.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default TipoTrabajoSelect
