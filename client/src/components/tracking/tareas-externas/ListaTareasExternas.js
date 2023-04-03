import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Row } from "react-bootstrap"

import { useAuth } from "../../../hooks/useAuth"

import { useMutation, useQueryClient } from "react-query"
import { actualizaEstadoTareaExterna, borraTareaExterna } from "../../../mutations/TareaExterna"
import { QUERY_TAREAS_EXTERNAS_ACTIVAS } from "../../../queries/TareaExterna"

import TareasExternasHeader from "./TareasExternasHeader"
import TareaExterna from "./TareaExternaCard"
import Confirmacion from '../../comun/Confirmacion'

const ListaTareasExternas = ({tareasExternas, titulo, siguienteEstado, textoContinuar, textoBorrar, textoConfirmacion, textoForward}) => {
  const navigate = useNavigate()
  const { credenciales } = useAuth()

  const [borrando, setBorrando] = useState(false)
  const [redireccionando, setRedireccionando] = useState(false)
  const [idTareaExterna, setIdTareaExterna] = useState(0)
  const [confirmacion, setConfirmacion] = useState({ mensaje: textoConfirmacion, mostrar: false })

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

  async function handlerConfirmacion(confirmado) {
    setConfirmacion(prevValue => ({...prevValue, mostrar: false}))

    if (confirmado) {
      if (borrando) {
        return await doBorraTareaExterna({id_tarea_externa: idTareaExterna})
      } 

      if (redireccionando) {
        return
      }

      return await doActualizaEstadoTareaExterna({id_tarea_externa: idTareaExterna, id_estado_tarea: siguienteEstado, id_usuario: credenciales.id_usuario})
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
    setConfirmacion(prevValue => ({...prevValue, mensaje: '¿Seguro que quieres redireccionar la tarea?', mostrar: true}))
    setRedireccionando(true)
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
