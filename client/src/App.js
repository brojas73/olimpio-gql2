import { useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Alert, Container } from "react-bootstrap"

import { useTareasExternas } from "./context/TareasExternasContext"

import IdleTimeoutHandler from "./components/comun/IdleTimeoutHandler"
import ProtectedLayout from "./components/comun/ProtectedLayout"

import GlobalNavbar from "./components/comun/GlobalNavbar"
import Home from './components/comun/Home'
import Login from "./components/login/Login"

import TareasActivas from "./components/tracking/tareas-externas/TareasActivas"
import PendienteRecoleccion from "./components/tracking/tareas-externas/PendienteRecoleccion"
import RecolectadosParaAtenderse from "./components/tracking/tareas-externas/RecolectadosParaAtenderse"
import RecibidosParaAtenderse from "./components/tracking/tareas-externas/RecibidosParaAtenderse"
import TerminadosParaRecolectar from "./components/tracking/tareas-externas/TerminadosParaRecolectar"
import RecolectadosParaEntrega from "./components/tracking/tareas-externas/RecolectadosParaEntrega"
import EntregadosASucursalOrigen from "./components/tracking/tareas-externas/EntregadosASucursalOrigen"

import ServiciosActivos from './components/tracking/servicios-domicilio/ServiciosActivos'

import Bitacora from "./components/consultas/tareas-externas/Bitacora"
import TareasPorAtenderseHoy from "./components/consultas/tareas-externas/TareasPorAtenderseHoy"
import NuevaTareaForm from "./components/tracking/tareas-externas/NuevaTareaForm"

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

        <Route path='/servicios-domicilio' element={<ProtectedLayout />} >
            <Route path='servicios-activos' element={<ServiciosActivos />} />
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
