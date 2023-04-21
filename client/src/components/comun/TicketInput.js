import { Form } from "react-bootstrap"

const TicketInput = (props) => {
    function handleChange(e) {
        props.onChange(formatTicket(e.target.value))
    }

    function formatTicket(value) {
        if (!value) return value
    
        // Sólo permito números
        const ticket = value.replace(/[^\d]/g, '')

        // La máxima longitud es 6
        return `${ticket.slice(0, 6)}`
    }

    return (
        <Form.Control 
            {...props}
            onChange={e => handleChange(e)} 
        />
    )
}

export default TicketInput
