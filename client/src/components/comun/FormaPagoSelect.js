import { Form, Spinner } from 'react-bootstrap'

import { useQuery } from 'react-query'
import { fetchFormasPago, QUERY_FORMAS_PAGO } from '../../queries/FormaPago'

const FormaPagoSelect = ({onChange, name, value, label, isInvalid, disabled}) => {
    const { data: formasPago, isLoading } = useQuery(QUERY_FORMAS_PAGO, fetchFormasPago, { staleTime: Infinity, cacheTime: Infinity})

    if (isLoading) return <Spinner animation="border" />

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select
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
