import { useState } from "react"

import {Button, Container, Form, Spinner} from 'react-bootstrap'

import { useAuth } from '../../hooks/useAuth'

import { useMutation } from "react-query"

import SucursalSelect from '../comun/SucursalSelect'
import { login } from "../../mutations/Login"
import { useTareasExternas } from "../../context/TareasExternasContext"

const Login = ({onLoginOk, onLoginFail}) => {
  const { setCredenciales } = useAuth()
  const { setSucursalActual } = useTareasExternas()

  const [formInfo, setFormInfo] = useState({
    usuario: '',
    contrasena: '',
    sucursal: 0
  })

  const { isLoading, mutate: doLogin } = useMutation({
    mutationFn: login, 
    onSuccess: (userInfo) => {
      if (!userInfo || userInfo === 'undefined') {
        onLoginFail('La combinación usuario/contraseña es inválida')
      } else {
        setCredenciales(userInfo)
        setSucursalActual(parseInt(formInfo.sucursal))
        onLoginOk(userInfo)
      }
    }
  })

  function handleChange(e) {
    setFormInfo(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
  }  

  async function handleSubmit(event) {
    event.preventDefault()
    await doLogin({
        usuario: formInfo.usuario,
        contrasena: formInfo.contrasena
    })
  }

  if (isLoading) return <Spinner animation="border" />
  
  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <SucursalSelect 
                    label='Sucursal Inicial'
                    onChange={handleChange} 
                    value={formInfo.sucursal}
                    name='sucursal' 
                />            
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control 
                    type='text'
                    placeholder="Escribe tu usuario..." 
                    onChange={handleChange}
                    name="usuario"
                    value={formInfo.usuario}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                    type='password'
                    placeholder="Escribe tu contraseña..." 
                    onChange={handleChange}
                    name="contrasena"
                    value={formInfo.contrasena}
                />
            </Form.Group>
            <Button 
                variant='primary' 
                type='submit'
            >
                Ingresar
            </Button>
        </Form>
    </Container>
  )
}

export default Login
