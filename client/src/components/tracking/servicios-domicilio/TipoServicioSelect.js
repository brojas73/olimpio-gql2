import { Form } from 'react-bootstrap'
import { TAMANO_CONTROLES } from '../../comun/utils'


const TipoServicioSelect = ({onChange, name, value, label, isInvalid}) => {
    return (
        <>
            <Form.Label column={TAMANO_CONTROLES}>Tipo de Servicio</Form.Label>
            <Form.Select
                size={TAMANO_CONTROLES}
                onChange={onChange}
                value={value}
                name={name}
                isInvalid={isInvalid}
            >
                <option key={0} value="">Selecciona uno...</option>
                <option key={1} value='R'>Recolección</option>
                <option key={2} value='E'>Entrega</option>
            </Form.Select>
        </>
    )
}

export default TipoServicioSelect
