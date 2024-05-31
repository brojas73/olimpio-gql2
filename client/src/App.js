import { Route, Routes, useNavigate } from "react-router-dom"

import { Container } from "react-bootstrap"

// Hooks
import { useOlimpio } from "./context/OlimpioContext"

// Components
import Home from './components/comun/Home'
import Login from "./components/login/Login"
import ProtectedLayout from './components/comun/ProtectedLayout'

import TabsOlimpio from "./components/comun/TabsOlimpio"

import TareasLocalesHome from "./components/tracking/tareas-locales/TareasLocalesHome"
import NuevaTareaLocalForm from "./components/tracking/tareas-locales/NuevaTareaForm"
import BitacoraTareaLocal from "./components/tracking/tareas-locales/BitacoraTareaLocal"

import TareasExternasHome from "./components/tracking/tareas-externas/TareasExternasHome"
import NuevaTareaForm from "./components/tracking/tareas-externas/NuevaTareaForm"
import BitacoraTareaExterna from "./components/tracking/tareas-externas/BitacoraTareaExterna"

import ServiciosDomicilioHome from "./components/tracking/servicios-domicilio/ServiciosDomicilioHome"
import NuevoServicioForm from "./components/tracking/servicios-domicilio/NuevoServicioForm"
import CancelarForm from './components/tracking/servicios-domicilio/CancelarForm'
import InformacionGeneralForm from "./components/tracking/servicios-domicilio/InformacionGeneralForm"
import FechaRequeridaForm from "./components/tracking/servicios-domicilio/FechaRequeridaForm"
import InformacionPagoForm from "./components/tracking/servicios-domicilio/InformacionPagoForm"
import BitacoraServicioDomicilio from "./components/tracking/servicios-domicilio/BitacoraServicioDomicilio"

import ConsultasTareasExternasHome from "./components/consultas/tareas-externas/ConsultasTareasExternasHome"
import TareasPorAtenderseHoy from "./components/consultas/tareas-externas/TareasPorAtenderseHoy"
import TareasTermiadas from "./components/consultas/tareas-externas/TareasTerminadas"
import Bitacora from "./components/consultas/tareas-externas/Bitacora"

import ConsultasServiciosDomicilioHome from "./components/consultas/servicios-domicilio/ConsultasServiciosDomicilioHome"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const navigate = useNavigate()
  const { setConectado } = useOlimpio()

  function handleLoginOk() {
    setConectado(true)
    navigate('/tracking/tareas-externas')
  }  

  return (
    <Container>
      <ToastContainer />
      <TabsOlimpio />
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login onLoginOk={handleLoginOk} />} />
        <Route path='/tracking' element={<ProtectedLayout />}>
          <Route path='tareas-locales' element={<TareasLocalesHome />} />
          <Route path='tareas-locales/nueva-tarea' element={<NuevaTareaLocalForm />} />
          <Route path='tareas-locales/bitacora-tarea-local' element={<BitacoraTareaLocal />} />

          <Route path='tareas-externas' element={<TareasExternasHome />} />
          <Route path='tareas-externas/nueva-tarea' element={<NuevaTareaForm />} />
          <Route path='tareas-externas/bitacora-tarea-externa' element={<BitacoraTareaExterna />} />

          <Route path='servicios-domicilio' element={<ServiciosDomicilioHome />} />
          <Route path='servicios-domicilio/nuevo-servicio-domicilio' element={<NuevoServicioForm />} />
          <Route path='servicios-domicilio/cancelar' element={<CancelarForm />} />
          <Route path='servicios-domicilio/actualiza-informacion-general' element={<InformacionGeneralForm />} />
          <Route path='servicios-domicilio/actualiza-fecha-requerida' element={<FechaRequeridaForm />} />
          <Route path='servicios-domicilio/actualiza-informacion-pago' element={<InformacionPagoForm />} />
          <Route path='servicios-domicilio/bitacora-servicio-domicilio' element={<BitacoraServicioDomicilio />} />
        </Route>
        <Route path='/consultas' element={<ProtectedLayout />}>
          <Route path='tareas-externas' element={<ConsultasTareasExternasHome />} />
          <Route path='tareas-externas/por-atenderse-hoy' element={<TareasPorAtenderseHoy />} />
          <Route path='tareas-externas/terminadas' element={<TareasTermiadas />} />
          <Route path='tareas-externas/bitacora' element={<Bitacora />} />

          <Route path='servicios-domicilio' element={<ConsultasServiciosDomicilioHome />} />
        </Route>
      </Routes> 
    </Container>
  )
}

export default App
