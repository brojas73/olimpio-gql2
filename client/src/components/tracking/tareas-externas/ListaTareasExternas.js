import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Row } from "react-bootstrap"

import { useAuth } from "../../../hooks/useAuth"

import { useMutation, useQueryClient } from "react-query"
import { actualizaEstadoTareaExterna, borraTareaExterna, redireccionaTareaExterna } from "../../../mutations/TareaExterna"
import { QUERY_TAREAS_EXTERNAS_ACTIVAS } from "../../../queries/TareaExterna"

import TareasExternasHeader from "./TareasExternasHeader"
import TareaExterna from "./TareaExternaCard"
import Confirmacion from '../../comun/Confirmacion'
import RedireccionaSucursalModal from "./RedireccionaSucursalModal"

const ListaTareasExternas = ({tareasExternas, titulo, siguienteEstado, textoContinuar, textoBorrar, textoConfirmacion, textoForward}) => {
  const navigate = useNavigate()
  const { credenciales } = useAuth()

  const [borrando, setBorrando] = useState(false)
  const [idTareaExterna, setIdTareaExterna] = useState(0)
  const [confirmacion, setConfirmacion] = useState({ mensaje: textoConfirmacion, mostrar: false })
  const [modalSucursalRedireccion, setModalSucursalRedireccion] = useState({mostrar: false})
  
  const queryClient = useQueryClient()
  const { mutate: doActualizaEstadoTareaExterna } = useMutation ({
    mutationFn: actualizaEstadoTareaExterna,
    onSuccess: (data) => {
      queryClient.setQueriesData(QUERY_TAREAS_EXTERNAS_ACTIVAS, (current) => (
        current.map(tareaExterna => (
          parseInt(tareaExterna.id_tarea_externa) === parseInt(data.id_tarea_externa) ? 
            {...tareaExterna, id_estado_tarea: data.id_estado_tarea} : tareaExterna 
        ))
      ))
    }
  })

  const { mutate: doBorraTareaExterna } = useMutation ({
    mutationFn: borraTareaExterna,
    onSuccess: (data) => {
      queryClient.setQueriesData(QUERY_TAREAS_EXTERNAS_ACTIVAS, (current) => (
        current.filter(tareaExterna => (parseInt(tareaExterna.id_tarea_externa) !== parseInt(data.id_tarea_externa)))
      ))
    }
  })

  const { mutate: doRedireccionaTareaExterna } = useMutation ({
    mutationFn: redireccionaTareaExterna,
    onSuccess: (data) => {
      queryClient.setQueriesData(QUERY_TAREAS_EXTERNAS_ACTIVAS, (current) => (
        current.map(tareaExterna => (
          parseInt(tareaExterna.id_tarea_externa) === parseInt(data.id_tarea_externa) ? 
            {...tareaExterna, id_estado_tarea: data.id_estado_tarea} : tareaExterna 
        ))
      ))
    }
  })

  function handlerConfirmacion(confirmado) {
    setConfirmacion(prevValue => ({...prevValue, mostrar: false}))

    if (confirmado) {
      if (borrando) {
        return doBorraTareaExterna({id_tarea_externa: idTareaExterna})
      } 

      return doActualizaEstadoTareaExterna({
        id_tarea_externa: idTareaExterna, 
        id_estado_tarea: siguienteEstado,
        id_usuario: credenciales.id_usuario
      })
    }
  }

  function handlerContinuar(idTareaExterna) {
    setIdTareaExterna(idTareaExterna)
    setConfirmacion(prevValue => ({...prevValue, mensaje: textoConfirmacion, mostrar: true}))
  }

  function handlerBorrar(idTareaExterna) {
    setIdTareaExterna(idTareaExterna)
    setConfirmacion(prevValue => ({...prevValue, mensaje: '¿Seguro que quieres borrar la tarea?', mostrar: true}))
    setBorrando(true)
  }

  function handlerForward(idTareaExterna) {
    setIdTareaExterna(idTareaExterna)
    setModalSucursalRedireccion(prevValue => ({...prevValue, mostrar: true}))

  }

  function handlerConfirmarForward(confirmado, idSucursalRedireccion) {
    setModalSucursalRedireccion(prevValue => ({...prevValue, mostrar: false}))
    if (confirmado) {
      return doRedireccionaTareaExterna({
        id_tarea_externa: idTareaExterna, 
        id_sucursal_redireccion: idSucursalRedireccion, 
        id_usuario: credenciales.id_usuario
      })
    }

  }

  function handlerLog(idTareaExterna) {
    navigate('/tracking/bitacora-tarea-externa', {
      state: {
        id_tarea_externa: idTareaExterna
      }
    })
  }

  return (
    <>
      <Confirmacion 
        mostrar={confirmacion.mostrar} 
        titulo='Confirmación' 
        mensaje={confirmacion.mensaje}
        onConfirmar={handlerConfirmacion}
      />

      <RedireccionaSucursalModal 
        mostrar={modalSucursalRedireccion.mostrar}
        onConfirmar={handlerConfirmarForward}
      />

      <TareasExternasHeader titulo={titulo} renglones={tareasExternas.length}/>
      <Row xs={1} md={1} lg={2} className="g-3">
      {
        tareasExternas.map(tareaExterna => (
          <TareaExterna 
              tareaExterna={tareaExterna} 
              textoContinuar={textoContinuar}
              textoBorrar={textoBorrar}
              textoForward={textoForward}
              onContinuar={handlerContinuar}
              onBorrar={handlerBorrar}
              onForward={handlerForward}
              onLog={handlerLog}
              key={tareaExterna.id_tarea_externa} 
          />
        ))
      }
      </Row>
    </>
  )
}

export default ListaTareasExternas
