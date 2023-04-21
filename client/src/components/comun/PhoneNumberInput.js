import { useState } from "react"
import { Form } from "react-bootstrap"

const PhoneNumberInput = (props) => {
    const[inputValue, setIputValue] = useState(props.initialvalue ? props.initialvalue : '')

    function handleChange(e) {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value)
      setIputValue(formattedPhoneNumber)
      props.onChange(formattedPhoneNumber)
    }

    function formatPhoneNumber(value) {
      if (!value) return value
    
      const phoneNumber = value.replace(/[^\d]/g, '')
      const phoneNumberLength = phoneNumber.length

      if (phoneNumberLength < 3) return phoneNumber
      if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6, 10)}`
    }

    return (
      <Form.Control 
        {...props}
        onChange={e => handleChange(e)} 
        value={inputValue} 
      />
    )
}

export default PhoneNumberInput
