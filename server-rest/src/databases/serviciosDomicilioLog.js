import pool from './pool.js'

const mainQuery = `
    select   case sd.tipo_servicio
                when 'E' then
                   'Entrega'
                when 'R' then
                   'Recolección'
             end as tipo_servicio_descripcion,
             s.nombre sucursal,
             case sdl.id_tipo_accion
                when 1 then
                   'Creación'
                when 2 then 
                   'Borrado'
                when 3 then 
                   'Actualización'
             end as tipo_accion,
             sdl.fecha, 
             u.nombre as usuario,
             estado_final.nombre as estado_fin,
             estado_inicial.nombre as estado_ini,
             sd.tipo_servicio,
             sd.id_servicio_domicilio as id_servicio_domicilio,
             sd.id_sucursal,
             sdl.id_servicio_domicilio_log as id,
             sd.ticket,
             sd.nombre,
             sd.direccion,
             sd.telefono
       from  servicio_domicilio_log as sdl
             inner join servicio_domicilio as sd
                on    sd.id_servicio_domicilio = sdl.id_servicio_domicilio
             inner join sucursal s
                on    s.id_sucursal = sd.id_sucursal
             left outer join usuario as u
                on    u.id_usuario = sdl.id_usuario
             inner join estado_servicio_domicilio as estado_final
                on    estado_final.id_estado_servicio_domicilio = sdl.id_estado_servicio_domicilio_fin
             left outer join estado_servicio_domicilio as estado_inicial
                on    estado_inicial.id_estado_servicio_domicilio = sdl.id_estado_servicio_domicilio_ini
`

const serviciosDomicilioLogByServicioDomicilio = (idServicioDomicilio) => {
    const q = `
       ${mainQuery}
          where sdl.id_servicio_domicilio = ?
       order by sdl.id_servicio_domicilio_log desc,
                sdl.fecha      
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idServicioDomicilio], (err, data) => {
            if (err) {
                console.log(err)
                reject({
                  status: 500,
                  message: err?.message || err
              })
          }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

export default {
    serviciosDomicilioLogByServicioDomicilio
}
