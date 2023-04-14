import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import { Row } from "react-bootstrap"

import { useAuth } from "../../../hooks/useAuth"

import { useMutation, useQueryClient } from "react-query"
import { QUERY_SERVICIOS_DOMICILIO_ACTIVOS } from "../../../queries/ServicioDomicilio"
import { actualizaEstado, borraServicioDomicilio} from "../../../mutations/ServicioDomicilio"

import ServiciosDomicilioHeader from "./ServiciosDomicilioHeader"
import ServicioDomicilio from "./ServicioDomicilioCard"
import Confirmacion from '../../comun/Confirmacion'

const ListaServiciosDomicilio = ({serviciosDomicilio, titulo, siguienteEstado, textoContinuar, textoBorrar, textoConfirmacion}) => {
  const navigate = useNavigate()
  const { credenciales } = useAuth()

  const [borrando, setBorrando] = useState(false)
  const [idServicioDomicilio, setIdServicioDomicilio] = useState(0)
  const [confirmacion, setConfirmacion] = useState({ mensaje: textoConfirmacion, mostrar: false })

  const queryClient = useQueryClient()
  const { mutate: doActualizaEstadoServicioDomicilio } = useMutation ({
    mutationFn: actualizaEstado,
    onSuccess: ({data}) => {
      queryClient.setQueriesData(QUERY_SERVICIOS_DOMICILIO_ACTIVOS, (current) => (
        current.map(serviciosDomicilio => (
          parseInt(serviciosDomicilio.id_servicio_domicilio) === parseInt(data.id_servicio_domicilio) ? 
            {...serviciosDomicilio, id_estado_servicio_domicilio: data.id_estado_servicio_domicilio} : serviciosDomicilio 
        ))
      ))
    }
  })

  const { mutate: doBorraServicioDomicilio } = useMutation ({
    mutationFn: borraServicioDomicilio,
    onSuccess: ({id_servicio_domicilio}) => {
      queryClient.setQueriesData(QUERY_SERVICIOS_DOMICILIO_ACTIVOS, (current) => (
        current.filter(servicioDomicilio => (parseInt(servicioDomicilio.id_servicio_domicilio) !== parseInt(id_servicio_domicilio)))
      ))
    }
  })

  function handleConfirmacion(confirmado) {
    setConfirmacion(prevValue => ({...prevValue, mostrar: false}))

    if (confirmado) {
      if (borrando) {
        return doBorraServicioDomicilio({id_servicio_domicilio: idServicioDomicilio})
      } 

      return doActualizaEstadoServicioDomicilio({id_servicio_domicilio: idServicioDomicilio, id_estado_servicio_domicilio: siguienteEstado, id_usuario: credenciales.id_usuario})
    }
  }

  function handleContinuar(idServicioDomicilio) {
    setIdServicioDomicilio(idServicioDomicilio)
    setConfirmacion(prevValue => ({...prevValue, mensaje: textoConfirmacion, mostrar: true}))
  }

  function handleBorrar(idServicioDomicilio) {
    setIdServicioDomicilio(idServicioDomicilio)
    setConfirmacion(prevValue => ({...prevValue, mensaje: '¿Seguro que quieres borrar el servicio a domicilio?', mostrar: true}))
    setBorrando(true)
  }

  function handleLog(idServicioDomicilio) {
    navigate('/servicios-domicilio/bitacora-servicio-domicilio', {
      state: {
        id_servicio_domicilio: idServicioDomicilio
      }
    })
  }

  function handleInformacionPago(idServicioDomicilio) {
    navigate('/servicios-domicilio/actualiza-informacion-pago', {
      state: {
        id_servicio_domicilio: idServicioDomicilio
      }
    })
  }

  function handleCambiarFecha(idServicioDomicilio) {
    navigate('/servicios-domicilio/actualiza-fecha-requerida', {
      state: {
        id_servicio_domicilio: idServicioDomicilio
      }
    })
  }

  return (
    <>
      <Confirmacion 
        mostrar={confirmacion.mostrar} 
        titulo='Confirmación' 
        mensaje={confirmacion.mensaje}
        onConfirmar={handleConfirmacion}
      />
      <ServiciosDomicilioHeader titulo={titulo} renglones={serviciosDomicilio.length}/>
      <Row xs={1} md={1} lg={2} className="g-3">
      {
        serviciosDomicilio.map(servicioDomicilio => (
          <ServicioDomicilio 
              servicioDomicilio={servicioDomicilio} 
              textoContinuar={textoContinuar}
              textoBorrar={textoBorrar}
              onContinuar={handleContinuar}
              onBorrar={handleBorrar}
              onLog={handleLog}
              onInformacionPago={handleInformacionPago}
              onCambiarFecha={handleCambiarFecha}              
              key={servicioDomicilio.id_servicio_domicilio} 
          />
        ))
      }
      </Row>
    </>
  )
}

export default ListaServiciosDomicilio
