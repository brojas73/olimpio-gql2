import { useState } from "react"
import { useMutation } from "@apollo/client"

import { Row } from "react-bootstrap"

import { useAuth } from "../../hooks/useAuth"
import { useTareasExternas } from "../../context/TareasExternasContext"

import { ACTUALIZA_TAREA_EXTERNA_ESTADO, BORRA_TAREA_EXTERNA } from "../../mutations/TareaExterna"
import { GET_TAREAS_EXTERNAS_ACTIVAS, GET_TAREAS_EXTERNAS_ACTIVAS_BY_DESTINO } from "../../queries/TareaExterna"


import TareasExternasHeader from "./TareasExternasHeader"
import TareaExterna from "./TareaExternaCard"
import Confirmacion from '../comun/Confirmacion'
// import { GET_TAREAS_EXTERNAS_LOG } from "../../queries/TareaExternaLog"

const ListaTareasExternas = ({tareasExternas, titulo, siguienteEstado, textoContinuar, textoBorrar, textoConfirmacion}) => {
  const { sucursalActual } = useTareasExternas()
  const { credenciales } = useAuth()

  const [borrando, setBorrando] = useState(false)
  const [idTareaExterna, setIdTareaExterna] = useState(0)
  const [confirmacion, setConfirmacion] = useState({ mensaje: textoConfirmacion, mostrar: false })

  const [actualizaTareaExternaEstado] = useMutation (ACTUALIZA_TAREA_EXTERNA_ESTADO, {
    variables: { 
        id_tarea_externa: idTareaExterna,
        id_estado_tarea: siguienteEstado,
        id_modificado_por: credenciales.id_usuario
    },
    refetchQueries: [
        { query: GET_TAREAS_EXTERNAS_ACTIVAS },
        { query: GET_TAREAS_EXTERNAS_ACTIVAS_BY_DESTINO, variables: { id_sucursal: sucursalActual }  }
      ]
  })

  const [borraTareaExterna] = useMutation(BORRA_TAREA_EXTERNA, {
    variables: { 
      id_tarea_externa: idTareaExterna
    },
    refetchQueries: [
          { query: GET_TAREAS_EXTERNAS_ACTIVAS },
          { query: GET_TAREAS_EXTERNAS_ACTIVAS_BY_DESTINO, variables: { id_sucursal: sucursalActual }  }
      ]
  })

  async function handleConfirmacion(confirmado) {
    setConfirmacion(prevValue => ({...prevValue, mostrar: false}))

    if (confirmado) {
      if (borrando) {
        return await borraTareaExterna()
      } 

      return await actualizaTareaExternaEstado()
    }
  }

  function onContinuar(idTareaExterna) {
    setIdTareaExterna(idTareaExterna)
    setConfirmacion(prevValue => ({...prevValue, mostrar: true}))
    setBorrando(false)
  }

  function onBorrar(idTareaExterna) {
    setIdTareaExterna(idTareaExterna)
    setConfirmacion(prevValue => ({...prevValue, mensaje: '¿Seguro que quieres borrar la tarea?', mostrar: true}))
    setBorrando(true)
  }

  return (
    <>
      <Confirmacion 
        mostrar={confirmacion.mostrar} 
        titulo='Confirmación' 
        mensaje={confirmacion.mensaje}
        onConfirmar={handleConfirmacion}
      />
      <TareasExternasHeader titulo={titulo} renglones={tareasExternas.length}/>
      <Row xs={1} md={1} lg={2} className="g-3">
      {
        tareasExternas.map(tareaExterna => (
          <TareaExterna 
              tareaExterna={tareaExterna} 
              tituloContinuar={textoContinuar}
              tituloBorrar={textoBorrar}
              onContinuar={onContinuar}
              onBorrar={onBorrar}
              key={tareaExterna.id_tarea_externa} 
          />
        ))
      }
      </Row>
    </>
  )
}

export default ListaTareasExternas
