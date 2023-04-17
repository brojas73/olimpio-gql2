import { useState } from "react"

import { Route, Routes, useNavigate } from "react-router-dom"

import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

import { logout } from './mutations/Usuario'
import { useTareasExternas } from "./context/TareasExternasContext"

import IdleTimeoutHandler from "./components/comun/IdleTimeoutHandler"
import ProtectedLayout from "./components/comun/ProtectedLayout"

import GlobalNavbar from "./components/comun/GlobalNavbar"
import Home from "./components/comun/Home"
import Login from "./components/login/Login"

import TareasActivas from "./components/tracking/tareas-externas/TareasActivas"
import PendienteRecoleccion from "./components/tracking/tareas-externas/PendienteRecoleccion"
import RecolectadosParaAtenderse from "./components/tracking/tareas-externas/RecolectadosParaAtenderse"
import RecibidosParaAtenderse from "./components/tracking/tareas-externas/RecibidosParaAtenderse"
import TerminadosParaRecolectar from "./components/tracking/tareas-externas/TerminadosParaRecolectar"
import RecolectadosParaEntrega from "./components/tracking/tareas-externas/RecolectadosParaEntrega"
import EntregadosASucursalOrigen from "./components/tracking/tareas-externas/EntregadosASucursalOrigen"
import NuevaTareaForm from "./components/tracking/tareas-externas/NuevaTareaForm"
import BitacoraTareaExterna from "./components/tracking/tareas-externas/BitacoraTareaExterna"

import Bitacora from "./components/consultas/tareas-externas/Bitacora"
import TareasPorAtenderseHoy from "./components/consultas/tareas-externas/TareasPorAtenderseHoy"

import ServiciosActivos from './components/tracking/servicios-domicilio/ServiciosActivos'
import PendienteRecoleccionEnCliente from "./components/tracking/servicios-domicilio/PendienteRecoleccionEnCliente"
import RecolectadosParaEntregaEnSucursal from "./components/tracking/servicios-domicilio/RecolectadosParaEntregaEnSucursal"
import RecibidosEnSucursal from "./components/tracking/servicios-domicilio/RecibidosEnSucursal"
import NuevoServicioForm from "./components/tracking/servicios-domicilio/NuevoServicioForm"
import EntregadosACliente from "./components/tracking/servicios-domicilio/EntregadosACliente"
import PendienteRecoleccionEnSucursal from "./components/tracking/servicios-domicilio/PendienteRecoleccionEnSucursal"
import RecolectadoParaEntregaACliente from "./components/tracking/servicios-domicilio/RecolectadoParaEntregaACliente"
import InformacionPagoForm from "./components/tracking/servicios-domicilio/InformacionPagoForm"
import CancelarForm from "./components/tracking/servicios-domicilio/CancelarForm"
import PorPagar from "./components/tracking/servicios-domicilio/PorPagar"
import BitacoraServicioDomicilio from './components/tracking/servicios-domicilio/BitacoraServicioDomicilio'
import { useMutation } from "react-query"
import { useAuth } from "./hooks/useAuth"
import FechaRequeridaForm from "./components/tracking/servicios-domicilio/FechaRequeridaForm"
import InformacionGeneralForm from "./components/tracking/servicios-domicilio/InformacionGeneralForm"

function App() {
  const navigate = useNavigate()
  const { conectado, setConectado } = useTareasExternas()
  const { setCredenciales } = useAuth()
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: '',
    tipo: 'success'
  })

  const { mutate: doLogout } = useMutation({
    mutationFn: logout, 
    onSuccess: () => {
      setCredenciales(null)
      setConectado(false)
      navigate('/login')
    }
  })

  function handleLogout() {
    doLogout()
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
            <Route path='bitacora-tarea-externa' element={<BitacoraTareaExterna />} />
        </Route>

        <Route path='/servicios-domicilio' element={<ProtectedLayout />} >
            <Route path='servicios-activos' element={<ServiciosActivos />} />
            <Route path='nuevo-servicio-domicilio' element={<NuevoServicioForm />} />
            <Route path='pendiente-recoleccion-en-cliente' element={<PendienteRecoleccionEnCliente />} />
            <Route path='recolectados-para-entrega-en-sucursal' element={<RecolectadosParaEntregaEnSucursal />} />
            <Route path='recibidos-en-sucursal' element={<RecibidosEnSucursal />} />
            <Route path='pendiente-recoleccion-en-sucursal' element={<PendienteRecoleccionEnSucursal />} />
            <Route path='recolectados-para-entrega-a-cliente' element={<RecolectadoParaEntregaACliente />} />
            <Route path='entregados-a-cliente' element={<EntregadosACliente />} />
            <Route path='cancelar' element={<CancelarForm />} />
            <Route path='actualiza-informacion-pago' element={<InformacionPagoForm />} />
            <Route path='actualiza-fecha-requerida' element={<FechaRequeridaForm />} />
            <Route path='actualiza-informacion-general' element={<InformacionGeneralForm />} />
            <Route path='por-pagar' element={<PorPagar />} />
            <Route path='bitacora-servicio-domicilio' element={<BitacoraServicioDomicilio />} />
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
