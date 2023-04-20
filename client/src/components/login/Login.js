import { useState } from "react"

// Bootstrap
import {Alert, Button, Container, Form, Spinner} from 'react-bootstrap'

// Hooks
import { useAuth } from '../../hooks/useAuth'
import { useTareasExternas } from "../../context/TareasExternasContext"

// Mutation
import { useMutation } from "react-query"
import { login } from "../../mutations/Usuario"

// Components
import SucursalSelect from '../comun/SucursalSelect'
import { TAMANO_CONTROLES } from "../comun/utils"

const Login = ({onLoginOk}) => {
  const { setCredenciales } = useAuth()
  const { setSucursalActual } = useTareasExternas()

  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: '',
    tipo: 'danger'
  })

  const [formInfo, setFormInfo] = useState({
    usuario: '',
    contrasena: '',
    sucursal: 0
  })

  const { isLoading, mutate: doLogin } = useMutation({
    mutationFn: login, 
    onSuccess: (userInfo => {
      if (!userInfo || userInfo === 'undefined') {
        onLoginFail('La combinación usuario/contraseña es inválida')
      } else {
        setCredenciales(userInfo)
        setSucursalActual(parseInt(formInfo.sucursal))
        onLoginOk()
      }
    })
  })

  function handleChange(e) {
    setFormInfo(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
  }  

  function handleSubmit(event) {
    event.preventDefault()
    doLogin({
        usuario: formInfo.usuario,
        contrasena: formInfo.contrasena
    })
  }

  function despliegaAlerta(mensaje, tipoAlerta='success') {
    setAlerta(prevValue => ({...prevValue, mostrar: true, mensaje: mensaje, tipo: tipoAlerta}))
    window.setTimeout(() => {
      setAlerta(prevValue => ({...prevValue, mostrar: false}))
    }, 2000)
  }  

  function onLoginFail(mensaje) {
    despliegaAlerta(mensaje, 'danger')
  }

  if (isLoading) return <Spinner animation="border" />
  
  return (
    <Container >
      <Alert
        show={alerta.mostrar} 
        variant={alerta.tipo} 
        onClose={() => setAlerta(prevValue => ({...prevValue, mostrar: false}))} 
        dismissible
      >
        {alerta.mensaje}
      </Alert>

      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
              <SucursalSelect 
                  label='Sucursal Inicial'
                  onChange={handleChange} 
                  value={formInfo.sucursal}
                  name='sucursal' 
              />            
          </Form.Group>
          <Form.Group className="mb-2">
              <Form.Label column={TAMANO_CONTROLES}>Usuario</Form.Label>
              <Form.Control 
                  size={TAMANO_CONTROLES}
                  type='text'
                  placeholder="Escribe tu usuario..." 
                  onChange={handleChange}
                  name="usuario"
                  value={formInfo.usuario}
              />
          </Form.Group>
          <Form.Group className="mb-2">
              <Form.Label column={TAMANO_CONTROLES}>
                Contraseña</Form.Label>
              <Form.Control 
                  size={TAMANO_CONTROLES}
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
              size={TAMANO_CONTROLES}
          >
              Ingresar
          </Button>
      </Form>
    </Container>
  )
}

export default Login
