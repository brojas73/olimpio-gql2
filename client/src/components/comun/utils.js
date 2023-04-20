import { STATUS_TAREA } from '../../context/TareasExternasContext'
import { STATUS_SERVICIO_DOMICILIO } from '../../context/ServiciosDomicilioContext'

const URL_APIS_DEV = 'http://localhost:3040/api-v1'
const URL_APIS_PROD = 'http://5.183.8.10/api-v1'

export const TIPO_CONSULTA_TE = {
  TIPO_CONSULTA: 0,
  POR_ATENDERSE_HOY: 1,
  BITACORA: 2
}

export const TAMANO_CONTROLES = "sm"
export const FONT_SIZE_DROPDOWN = "90%"
export const FONT_SIZE_TABS = "90%"

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


