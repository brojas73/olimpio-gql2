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

export async function fetchData(url) { 
    return await fetch(url).then(response => response.json())
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
