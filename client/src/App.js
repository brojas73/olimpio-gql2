import { useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Alert, Container } from "react-bootstrap"

import { useTareasExternas } from "./context/TareasExternasContext"

import IdleTimeoutHandler from "./components/comun/IdleTimeoutHandler"
import ProtectedLayout from "./components/comun/ProtectedLayout"

import GlobalNavbar from "./components/comun/GlobalNavbar"
import Home from './components/comun/Home'
import Login from "./components/login/Login"

import TareasActivas from "./components/tracking/TareasActivas"
import PendienteRecoleccion from "./components/tracking/PendienteRecoleccion"
import RecolectadosParaAtenderse from "./components/tracking/RecolectadosParaAtenderse"
import RecibidosParaAtenderse from "./components/tracking/RecibidosParaAtenderse"
import TerminadosParaRecolectar from "./components/tracking/TerminadosParaRecolectar"
import RecolectadosParaEntrega from "./components/tracking/RecolectadosParaEntrega"
import EntregadosASucursalOrigen from "./components/tracking/EntregadosASucursalOrigen"

import Bitacora from "./components/consultas/Bitacora"
import TareasPorAtenderseHoy from "./components/consultas/TareasPorAtenderseHoy"
import NuevaTareaForm from "./components/tracking/NuevaTareaForm"

function App() {
  const navigate = useNavigate()
  const { conectado, setConectado } = useTareasExternas()
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: '',
    tipo: 'success'
  })

  function handleLogout() {
    setConectado(false)
    navigate('/login')
  }  

  function handleLoginOk() {
    setConectado(true)
    navigate('/tracking/tareas-activas')
  }  

  function handleLoginFail(mensaje) {
    setConectado(false)
    despliegaAlerta(mensaje, 'danger')
  }  

  function despliegaAlerta(mensaje, tipoAlerta='success') {
    setAlerta(prevValue => ({...prevValue, mostrar: true, mensaje: mensaje, tipo: tipoAlerta}))
    window.setTimeout(() => {
      setAlerta(prevValue => ({...prevValue, mostrar: false}))
    }, 2000)
  }  

  return (
    <Container>
      {
        conectado && (
          <IdleTimeoutHandler onLogout={() => handleLogout()} />
        )
      }
      <GlobalNavbar onLogout={() => handleLogout()}/>
      <Alert 
        show={alerta.mostrar} 
        variant={alerta.tipo} 
        onClose={() => setAlerta(prevValue => ({...prevValue, mostrar: false}))} 
        dismissible
      >
        {alerta.mensaje}
      </Alert>

      <Routes>
        <Route path='/login' element={<Login onLoginOk={handleLoginOk} onLoginFail={handleLoginFail}/>} />
        <Route path='/' element={<Home />} />

        <Route path='/tracking' element={<ProtectedLayout />} >
            <Route path='tareas-activas' element={<TareasActivas />} />
            <Route path='nueva-tarea' element={<NuevaTareaForm />} />
            <Route path='pendiente-recoleccion' element={<PendienteRecoleccion />} />
            <Route path='recolectados-para-atenderse' element={<RecolectadosParaAtenderse />} />
            <Route path='recibidos-para-atenderse' element={<RecibidosParaAtenderse />} />
            <Route path='terminados-para-recolectar' element={<TerminadosParaRecolectar />} />
            <Route path='recolectados-para-entrega' element={<RecolectadosParaEntrega />} />
            <Route path='entregados-a-sucursal-origen' element={<EntregadosASucursalOrigen />} />
        </Route>

        <Route path='/consultas' element={<ProtectedLayout />}>
            <Route path='bitacora' element={<Bitacora />} />
            <Route path='tareas-por-atenderse-hoy' element={<TareasPorAtenderseHoy />} />
          </Route>
      </Routes>
    </Container>
  )
}

export default App
