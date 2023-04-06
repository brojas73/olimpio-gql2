import { STATUS_TAREA } from '../../context/TareasExternasContext'

const URL_APIS_DEV = 'http://localhost:3020/api'
const URL_APIS_PROD = 'http://5.183.8.10/api'

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
  const fechaTmp = new Date(fecha)
  const horaFormateada = String(fechaTmp.getHours()).padStart(2, '0') + ':' +
                         String(fechaTmp.getMinutes()).padStart(2, '0')
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
  const sucursal = sucursales.find(sucursal => parseInt(sucursal.id_sucursal) === parseInt(idSucursal))
  return (sucursal ? sucursal.nombre : 'Sucursal')
}

export function nombreUsuario(usuarios, idUsuario) {
  const usuario = usuarios.find(usuario => parseInt(usuario.id_usuario) === parseInt(idUsuario))
  return (usuario ? usuario.nombre : 'Usuario')
}

export function nombreEstadoTarea(estadosTarea, idEstadoTarea) {
  const estadoTarea = estadosTarea.find(estadoTarea => parseInt(estadoTarea.id_estado_tarea) === parseInt(idEstadoTarea))
  return (estadoTarea ? estadoTarea.nombre : 'Estado')
}

export function nombreEstadoServicioDomicilio(estadosServicioDomicilio, idEstadoServicioDomicilio) {
  const estadoServicioDomicilio = estadosServicioDomicilio.find(estadoServicioDomicilio => parseInt(estadoServicioDomicilio.id_estado_servicio_domicilio) === parseInt(idEstadoServicioDomicilio))
  return (estadoServicioDomicilio ? estadoServicioDomicilio.nombre : 'Estado del Servicio')
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


