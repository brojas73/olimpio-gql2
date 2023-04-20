import { useState } from "react"
import { Form } from "react-bootstrap"
import { TAMANO_CONTROLES } from "./utils"

const PhoneNumberInput = ({placeholder, required, name, onChange, isInvalid, initialValue}) => {
  const[inputValue, setIputValue] = useState(initialValue ? initialValue : '')

  function handleChange(e) {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setIputValue(formattedPhoneNumber)
    onChange(formattedPhoneNumber)
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
        size={TAMANO_CONTROLES}
        name={name}
        required={required}
        placeholder={placeholder} 
        onChange={e => handleChange(e)} 
        value={inputValue} 
        isInvalid={isInvalid}
    />
  )
}

export default PhoneNumberInput
