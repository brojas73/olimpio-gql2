import { useState } from "react"
import { Form } from "react-bootstrap"

const TicketInput = (props) => {
    const[inputValue, setIputValue] = useState(props.initialValue ? props.initialValue : '')

    function handleChange(e) {
        const formattedTicket = formatTicket(e.target.value)
        setIputValue(formattedTicket)
        props.onChange(formattedTicket)
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
            value={inputValue} 
        />
    )
}

export default TicketInput
