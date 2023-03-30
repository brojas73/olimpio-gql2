import { Form, Spinner } from 'react-bootstrap'

import { useQuery } from 'react-query'
import { fetchTiposTrabajo, QUERY_TIPOS_TRABAJO } from '../../queries/TipoTrabajo'

const TipoTrabajoSelect = ({onChange, name, value, label}) => {
    const { data: tiposTrabajo, isLoading } = useQuery(QUERY_TIPOS_TRABAJO, fetchTiposTrabajo, { refetchOnWindowFocus: false})

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
                    tiposTrabajo.map(tipoTrabajo => (
                        <option key={tipoTrabajo.id_tipo_trabajo} value={tipoTrabajo.id_tipo_trabajo}>{tipoTrabajo.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default TipoTrabajoSelect
