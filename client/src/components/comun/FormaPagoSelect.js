import { Form, Spinner } from 'react-bootstrap'

import { useQuery } from 'react-query'
import { fetchFormasPago, QUERY_FORMAS_PAGO } from '../../queries/FormaPago'
import { TAMANO_CONTROLES } from './utils'

const FormaPagoSelect = ({onChange, name, value, label, isInvalid, disabled}) => {
    const { data: formasPago, isLoading, error } = useQuery({
        queryKey: [QUERY_FORMAS_PAGO], 
        queryFn: fetchFormasPago, 
        retry: false,
        staleTime: Infinity, 
        cacheTime: Infinity
    })

    if (isLoading) return <Spinner animation="border" />

    if (error) return <span>{error.message}</span>

    return (
        <>
            <Form.Label column={TAMANO_CONTROLES}>{label}</Form.Label>
            <Form.Select
                size={TAMANO_CONTROLES}
                disabled={disabled}
                onChange={onChange}
                value={value}
                name={name}
                isInvalid={ isInvalid }
                >
                <option key={0} value="">Selecciona una...</option>
                {
                    formasPago.map(formaPago => (
                        <option key={formaPago.id_forma_pago} value={formaPago.id_forma_pago}>{formaPago.nombre}</option>
                    ))
                }
            </Form.Select>
        </>
    )
}

export default FormaPagoSelect
