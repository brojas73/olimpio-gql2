import { useState } from "react"
import { useMutation } from "@apollo/client"

import {Button, Container, Form, Spinner} from 'react-bootstrap'

import { useAuth } from '../../hooks/useAuth'

import SucursalSelect from '../comun/SucursalSelect'
import { LOGIN } from "../../mutations/Login"
import { useTareasExternas } from "../../context/TareasExternasContext"

const Login = ({onLoginOk, onLoginFail}) => {
  const { setCredenciales } = useAuth()
  const { setSucursalActual } = useTareasExternas()

  const [formInfo, setFormInfo] = useState({
    usuario: '',
    contrasena: '',
    sucursal: 0
  })

  const [login, {loading}] = useMutation(LOGIN)

  function handleChange(e) {
    setFormInfo(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
  }  

  async function handleSubmit(event) {
    event.preventDefault()
    await login({
      variables: {
        usuario: formInfo.usuario,
        contrasena: formInfo.contrasena
      },
      onCompleted: ( { login }) => {
        if (login.status.successful) {
          const { usuario: { id_usuario, nombre, rol: { id_rol } } } = login
          const userInfo = { id_usuario, nombre, id_rol}
          setCredenciales(userInfo)
          setSucursalActual(parseInt(formInfo.sucursal))
          onLoginOk(userInfo)
        } else {
          onLoginFail(login.status.message)
        }
      }
    })
  }

  if (loading) return <Spinner animation="border" />
  
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
