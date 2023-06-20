import { STATUS_TAREA_LOCAL } from '../../context/TareasLocalesContext'
import { STATUS_TAREA } from '../../context/TareasExternasContext'
import { STATUS_SERVICIO_DOMICILIO } from '../../context/ServiciosDomicilioContext'

const URL_APIS_DEV = 'http://localhost:3040/api-test'
// const URL_APIS_PROD = 'http://5.183.8.10:3020/api-test'
const URL_APIS_PROD = 'http://5.183.8.10/api-v1'

export const TIPO_CONSULTA_TE = {
  TIPO_CONSULTA: 0,
  POR_ATENDERSE_HOY: 1,
  BITACORA: 2
}

export const TAMANO_CONTROLES = "sm"

export function formateaFechaHora(fecha, hora, mostrarDia = true, mostrarAt = true) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const fechaTmp = new Date(Date.parse(fecha.substring(0, 10) + 'T' + hora))
    return (mostrarDia && dias[fechaTmp.getDay()] + ', '  ) + 
           fechaTmp.getDate() + ' ' + 
           meses[fechaTmp.getMonth()] + ' ' +
           fechaTmp.getFullYear() + 
           (mostrarAt ? ' @ ' : ' ') +
           hora.substring(0, 5) + ' hr'
}

export function formateaFecha(fecha, mostrarDia = true, mostrarAt = true) {
    const fechaTmp = new Date(fecha)
    const anio = fechaTmp.getFullYear()
    const mes = String(fechaTmp.getMonth() + 1).padStart(2, '0')
    const dia = String(fechaTmp.getDate()).padStart(2, '0')
    const horas = String(fechaTmp.getHours()).padStart(2, '0')
    const minutos = String(fechaTmp.getMinutes()).padStart(2, '0')
    const fechaStr = `${anio}-${mes}-${dia}`
    const hora = `${horas}:${minutos}`
    return formateaFechaHora(fechaStr, hora, mostrarDia, mostrarAt)
}

export function formateaFechaForm(fecha) {
  const fechaTmp = new Date(fecha)
  const fechaFormateada = fechaTmp.getFullYear() + '-' + 
                          String((fechaTmp.getMonth() + 1)).padStart(2, '0') + '-' + 
                          String(fechaTmp.getDate()).padStart(2, '0') 
  return fechaFormateada
}  

export function formateaHoraForm(fecha) {
  // const fechaTmp = new Date(fecha)
  // const horaFormateada = String(fechaTmp.getHours()).padStart(2, '0') + ':' +
  //                        String(fechaTmp.getMinutes()).padStart(2, '0')
  const horaFormateada = '17:00' 
  return horaFormateada
}

export const ticketFormatter = (data, row) => {
    return (
      <>
        { data.padStart(6, '0') }
      </>
    )
}

export const fechaFormatter = (data, row) => {
    return  (
      <>
        { formateaFecha(data, false, true) }
      </>
    )
}

export const accionFormatter = (data, row) => {
  return (
    <>
      { data }
    </>
  )
}

export async function fetchData(url) { 
  const response = await fetch(url, {credentials: 'include'}).then(response => response.json())
  return response
}    

export function nombreSucursal(sucursales, idSucursal) {
  if (!sucursales)
    return 'Sucursal'
  const sucursal = sucursales.find(sucursal => parseInt(sucursal.id_sucursal) === parseInt(idSucursal))
  return (sucursal ? sucursal.nombre : 'Sucursal')
}

export function nombreUsuario(usuarios, idUsuario) {
  if (!usuarios)
    return 'Usuario'

  return usuarios.find(usuario => parseInt(usuario.id_usuario) === parseInt(idUsuario)).nombre
}

export function nombreEstadoTarea(estadosTarea, idEstadoTarea) {
  if (!estadosTarea)
    return 'Estado'
  return estadosTarea.find(estadoTarea => parseInt(estadoTarea.id_estado_tarea) === parseInt(idEstadoTarea)).nombre
}

export function nombreEstadoServicioDomicilio(estadosServicioDomicilio, idEstadoServicioDomicilio) {
  if (!estadosServicioDomicilio)
    return 'Estado del Servicio'
  
  return estadosServicioDomicilio.find(estadoServicioDomicilio => parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) === parseInt(idEstadoServicioDomicilio)).nombre
}

export function isBlank(str) {
  return (!str || /^\s*$/.test(str))
}

export function getUrlApis() {
  return process.env.NODE_ENV === 'development' ? URL_APIS_DEV : URL_APIS_PROD 
} 

export function esEntrega(servicioDomicilio) {
  return servicioDomicilio.tipo_servicio === 'E'
}

export function esRecoleccion(servicioDomicilio) {
  return servicioDomicilio.tipo_servicio === 'R'
}

export function servicioActivo(servicioDomicilio) {
  return (
    servicioDomicilio.id_estado_servicio_domicilio !== STATUS_SERVICIO_DOMICILIO.TERMINADO &&
    servicioDomicilio.id_estado_servicio_domicilio !== STATUS_SERVICIO_DOMICILIO.CANCELADO 
  )
}

export function pagado(servicioDomicilio) {
  return !(servicioDomicilio.pagado === 'N')
}

export function esPendienteDeRecoleccion(tareaExterna) {
  return parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.PENDIENTE_RECOLECCION
}

export function esRedireccionada(tareaExterna) {
  return parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.REDIRECCIONADO
}

export function origenEnSucursalActual(tareaExterna, sucursalActual) {
  return parseInt(sucursalActual) === parseInt(tareaExterna.id_sucursal_origen)
}

export function destinoEnSucursalActual(tareaExterna, sucursalActual) {
  return parseInt(sucursalActual) === parseInt(tareaExterna.id_sucursal_destino)
}

export function redireccionEnSucursalActual(tareaExterna, sucursalActual) {
  return parseInt(sucursalActual) === parseInt(tareaExterna.id_sucursal_redireccion)
}

export function esRedireccionadaAMaquila(tareaExterna) {
    return parseInt(tareaExterna.id_sucursal_redireccion) >= 99
}

// Funciones helpers

/* ----------- Helpers Servicios a Domicilio -----------------*/
export function getSiguienteEstadoServicioDomicilio(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
          return STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
          return STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL
      case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
          return STATUS_SERVICIO_DOMICILIO.TERMINADO
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
          return STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
          return STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE
      case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
          return STATUS_SERVICIO_DOMICILIO.TERMINADO
      default:
          return null
  }
}

export function getTextoConfirmacionServicioDomicilio(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
          return '¿Seguro que quieres recolectar el servicio a domicilio?'
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
          return '¿Seguro que quieres entregar el servicio a domicilio?'
      case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
          return '¿Seguro que quieres terminar el servicio a domicilio?'
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
          return '¿Seguro que quieres recolectar el servicio a domicilio?'
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
          return '¿Seguro que quieres entregar el servicio a domicilio?'
      case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
          return '¿Seguro que quieres terminar el servicio a domicilio?'
      default:
          return 'Desconocido'
  }
}

export function getTituloServicioDomicilio(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_SERVICIO_DOMICILIO.SERVICIOS_DOMICILIO_ACTIVOS:
          return 'Servicios a Domicilio Activos'
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
          return 'Pendiente de Recolección en Cliente'
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
          return 'Recolectados para Entrega En Sucursal'
      case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
          return 'Recibidos en Sucursal'
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
          return 'Pendiente de Recolección en Sucursal'
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
          return 'Recolectados para Entrega a Cliente'
      case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
          return 'Entregados al Cliente'
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_DE_PAGO:
          return 'Pendiente de Pago'
      default:
          return 'Desconocido'
  }
}

export function getTextoContinuarServicioDomicilio(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
          return 'Recolectar'
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
          return 'Entregar'
      case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
          return 'Recibir'
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
          return 'Recolectar'
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
          return 'Entregar'
      case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
          return 'Terminar'
      default:
          return 'Desconocido'
  }
}

export function filtraServiciosDomicilio(serviciosDomicilio, filtros, sucursalActual) {
  const serviciosDomicilioFiltrados = serviciosDomicilio.filter(servicioDomicilio => 
      (filtros.ticket.length === 0 || (filtros.ticket.length > 0 && servicioDomicilio.ticket.includes(filtros.ticket))) 
  )

  switch (parseInt(filtros.estado)) {
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE:
          return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
              parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_CLIENTE &&
              parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual)
          ))
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL:
          return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
              parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_SUCURSAL &&
              parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual)
          ))
      case STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL:
          return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
              parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECIBIDO_EN_SUCURSAL &&
              parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
          ))
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL:
          return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
              parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.PENDIENTE_RECOLECCION_EN_SUCURSAL &&
              parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
          ))
      case STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE:
          return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
              parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.RECOLECTADO_PARA_ENTREGA_CLIENTE &&
              parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
          ))
      case STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE:
          return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
              parseInt(servicioDomicilio.id_estado_servicio_domicilio) === STATUS_SERVICIO_DOMICILIO.ENTREGADO_A_CLIENTE &&
              parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
          ))
      case STATUS_SERVICIO_DOMICILIO.PENDIENTE_DE_PAGO:
          return serviciosDomicilioFiltrados.filter(servicioDomicilio => (
              parseInt(servicioDomicilio.id_sucursal) === parseInt(sucursalActual) 
          ))
      default:
          return serviciosDomicilioFiltrados
      }
}

/* ----------- Helpers Tareas Externas -----------------*/
export function getTituloTareaExterna(idEstadoActual) {
    switch (parseInt(idEstadoActual)) {
        case STATUS_TAREA.TAREAS_ACTIVAS:
            return 'Tareas Activas'
        case STATUS_TAREA.PENDIENTE_RECOLECCION:
            return 'Pendiente de Recolección'
        case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
            return 'Recolectadas para Atenderse'
        case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
            return 'Recibidas para Atenderse'
        case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
            return 'Terminadas para Recolectar'
        case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
            return 'Recolectadas para Entrega'
        case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
            return 'Entregadas a Sucursal Origen'
        default:
            return 'Desconocido'
    }
  }
  
  export function getSiguienteEstadoTareaExterna(idEstadoActual, esRedireccionadaAMaquila) {
    switch (parseInt(idEstadoActual)) {
      case STATUS_TAREA.PENDIENTE_RECOLECCION:
        /***
         * Cuando una tarea se redireccionó (desvió) y va para la maquila, como la maquila es la
         * encargada de recolectar la prenda y no tiene acceso al sistem, daremos como estado actual
         * después de entregar la pieza como que ya se recibió en la maquila. En caso de que se haya
         * desviado a una sucursal que no es la maquila, el proceso es el normal, el repartidor tiene
         * que recoger el material y entregarlo a la sucursal destino
         */
        return esRedireccionadaAMaquila ? STATUS_TAREA.RECIBIDO_PARA_ATENDERSE : STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE
      case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
        return STATUS_TAREA.RECIBIDO_PARA_ATENDERSE
      case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
        return STATUS_TAREA.TERMINADO_PARA_RECOLECTAR
      case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:  
        return STATUS_TAREA.RECOLECTADO_PARA_ENTREGA
      case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
        return STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN
      case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
        return STATUS_TAREA.RECIBIDO_EN_SUCURSAL_ORIGEN
      default:
        return null
  }
}

export function getTextoConfirmacionTareaExterna(idEstadoActual, esRedireccionadaAMaquila) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_TAREA.PENDIENTE_RECOLECCION:
          // Las tareas pediente de recolección pudieran ser entregadas por el encargado o recolectadas por el chofer
          // el texto será entregar si es un encargado de tienda pues estará entregando la mercancía a la maquila, si
          // es un chofer es porque está recolectando la mercancía para llevarla a una franquicia que no es maquila
          // Sólo para este caso en especial es para lo que estamos utilizando el parámetro esRedireccionadaAMaquila
          return esRedireccionadaAMaquila ? '¿Seguro que quieres entregar la tarea?' : '¿Seguro que quieres recolectar la tarea?'
      case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
          return '¿Seguro que quieres recibir la tarea?'
      case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
          return '¿Seguro que quieres terminar la tarea?'
      case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
          return '¿Seguro que quieres recolectar la tarea?'
      case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
          return '¿Seguro que quieres entregar la tarea?'
      case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
          return '¿Seguro que quieres recibir la tarea?'
      default:
          return 'Desconocido'
  }
}

export function getTextoConfirmacionBorrarTareaExterna(tareaExterna, idEstadoActual) {
  if (parseInt(idEstadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION) {
    if (tareaExterna.id_tarea_local) {
      return '¿Seguro que quieres cancelar el desvío de la tarea?'
    }

    return '¿Seguro que quieres borrar la tarea?'
  }

  return 'Confirmación'
}

export function getTextoContinuarTareaExterna(idEstadoActual, esRedireccionadaAMaquila) {

  switch (parseInt(idEstadoActual)) {
      case STATUS_TAREA.PENDIENTE_RECOLECCION:
          // Las tareas pediente de recolección pudieran ser entregadas por el encargado o recolectadas por el chofer
          // el texto será entregar si es un encargado de tienda pues estará entregando la mercancía a la maquila, si
          // es un chofer es porque está recolectando la mercancía para llevarla a una franquicia que no es maquila
          // Sólo para este caso en especial es para lo que estamos utilizando el parámetro esRedireccionadaAMaquila
          return esRedireccionadaAMaquila ? 'Entregar' : 'Recolectar'
      case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
          return 'Recibir'
      case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
          return 'Terminar'
      case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
          return 'Recolectar'
      case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
          return 'Entregar'
      case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
          return 'Recibir'
      default:
          return 'Desconocido'
  }
}

export function getTextoBorrarTareaExterna(tareaExterna, idEstadoActual) {
  return (parseInt(idEstadoActual) === STATUS_TAREA.PENDIENTE_RECOLECCION) ? (tareaExterna.id_tarea_local ? 'Cancelar' : 'Borrar') : null 
}

export function getTextoForwardTareaExterna(idEstadoActual) {
  return (parseInt(idEstadoActual) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE) ? 'Desviar' : null 
}

export function filtraTareasExternas(tareasExternasActivas, filtros, sucursalActual) {
  const tareasExternasFiltradas = tareasExternasActivas.filter(tareaExterna => 
      (filtros.ticket.length === 0 || (filtros.ticket.length > 0 && tareaExterna.ticket.includes(filtros.ticket))) &&
      (filtros.sucursal === 0 || (filtros.sucursal !== 0 && (tareaExterna.id_sucursal_origen === filtros.sucursal || tareaExterna.id_sucursal_destino === filtros.sucursal)))
  )

  switch (parseInt(filtros.estado)) {
      case STATUS_TAREA.PENDIENTE_RECOLECCION:
          return tareasExternasFiltradas.filter(tareaExterna => (
              (esPendienteDeRecoleccion(tareaExterna) && origenEnSucursalActual(tareaExterna, sucursalActual)) || 
              (esRedireccionada(tareaExterna) && destinoEnSucursalActual(tareaExterna, sucursalActual)) 
          ))
      case STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE:
          return tareasExternasFiltradas.filter(tareaExterna => (
              parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.RECOLECTADO_PARA_ATENDERSE &&
              parseInt(tareaExterna.id_sucursal_destino) === parseInt(sucursalActual)  
          ))
      case STATUS_TAREA.RECIBIDO_PARA_ATENDERSE:
          return tareasExternasFiltradas.filter(tareaExterna => (
              parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.RECIBIDO_PARA_ATENDERSE && 
              parseInt(tareaExterna.id_sucursal_destino) === parseInt(sucursalActual)
          ))
      case STATUS_TAREA.TERMINADO_PARA_RECOLECTAR:
          return tareasExternasFiltradas.filter(tareaExterna => (
              parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.TERMINADO_PARA_RECOLECTAR &&
              parseInt(tareaExterna.id_sucursal_destino) === parseInt(sucursalActual) 
          ))
      case STATUS_TAREA.RECOLECTADO_PARA_ENTREGA:
          return tareasExternasFiltradas.filter(tareaExterna => (
              parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.RECOLECTADO_PARA_ENTREGA &&
              parseInt(tareaExterna.id_sucursal_origen) === parseInt(sucursalActual) 
          ))
      case STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN:
          return tareasExternasFiltradas.filter(tareaExterna => (
              parseInt(tareaExterna.id_estado_tarea) === STATUS_TAREA.ENTREGADO_A_SUCURSAL_ORIGEN &&
              parseInt(tareaExterna.id_sucursal_origen) === parseInt(sucursalActual) 
          ))
      default:
          return tareasExternasFiltradas
  }
}

/* ----------- Helpers Tareas Locales  -----------------*/
export function getTituloTareaLocal(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_TAREA_LOCAL.TAREAS_ACTIVAS:
          return 'Tareas Activas'
      case STATUS_TAREA_LOCAL.POR_ATENDERSE:
          return 'Por Atenderse'
      case STATUS_TAREA_LOCAL.TERMINADO:
          return 'Terminadas'
      default:
          return 'Desconocido'
  }
}

export function getSiguienteEstadoTareaLocal(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
    case STATUS_TAREA_LOCAL.POR_ATENDERSE:
      return STATUS_TAREA_LOCAL.TERMINADO
    case STATUS_TAREA_LOCAL.TERMINADO:
      return STATUS_TAREA_LOCAL.CERRADO
    default:
      return null
  }
}

export function getTextoConfirmacionTareaLocal(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_TAREA_LOCAL.POR_ATENDERSE:
          return '¿Seguro que quieres terminar la tarea?'
      case STATUS_TAREA_LOCAL.TERMINADO:
        return '¿Seguro que quieres cerrar la tarea?'
      default:
        return 'Desconocido'
  }
}

export function getTextoContinuarTareaLocal(idEstadoActual) {
  switch (parseInt(idEstadoActual)) {
      case STATUS_TAREA_LOCAL.POR_ATENDERSE:
          return 'Terminar'
      case STATUS_TAREA_LOCAL.TERMINADO:
        return 'Cerrar'
      default:
        return 'Desconocido'
  }
}

export function getTextoBorrarTareaLocal(idEstadoActual) {
  return (parseInt(idEstadoActual) === STATUS_TAREA_LOCAL.POR_ATENDERSE) ? 'Borrar' : null 
}

export function getTextoForwardTareaLocal(idEstadoActual) {
  return (parseInt(idEstadoActual) === STATUS_TAREA_LOCAL.POR_ATENDERSE) ? 'Desviar' : null 
}

export function filtraTareasLocales(tareasActivas, filtros, sucursalActual) {
  const tareasFiltradas = tareasActivas.filter(tarea => 
      (filtros.ticket.length === 0 || (filtros.ticket.length > 0 && tarea.ticket.includes(filtros.ticket))) &&
      (filtros.sucursal === 0 || (filtros.sucursal !== 0 && (tarea.id_sucursal_origen === filtros.sucursal || tarea.id_sucursal_destino === filtros.sucursal)))
  )

  switch (parseInt(filtros.estado)) {
      case STATUS_TAREA_LOCAL.POR_ATENDERSE:
          return tareasFiltradas.filter(tarea => (
            parseInt(tarea.id_estado_tarea) === STATUS_TAREA_LOCAL.POR_ATENDERSE &&
            parseInt(tarea.id_sucursal) === parseInt(sucursalActual) 
          ))
      case STATUS_TAREA_LOCAL.TERMINADO:
          return tareasFiltradas.filter(tarea => (
            parseInt(tarea.id_estado_tarea) === STATUS_TAREA_LOCAL.TERMINADO &&
            parseInt(tarea.id_sucursal) === parseInt(sucursalActual) 
          ))
      default:
          return tareasFiltradas
  }
}
