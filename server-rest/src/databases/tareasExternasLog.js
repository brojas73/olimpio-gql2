import pool from './pool.js'

const mainQuery = `
    select   te.ticket,
             so.nombre sucursal_origen,
             te.descripcion,
             case tel.id_tipo_accion
                when 1 then
                   'Creación'
                when 2 then 
                   'Borrado'
                when 3 then 
                   'Actualización'
             end as tipo_accion,
             tel.fecha, 
             u.nombre as usuario,
             estado_final.nombre as estado_fin,
             estado_inicial.nombre as estado_ini,
             te.id_tarea_externa as id_tarea_externa,
             te.id_sucursal_origen,
             te.id_sucursal_destino,
             tel.id_tarea_externa_log as id
       from  tarea_externa_log as tel
             inner join tarea_externa as te
                on    te.id_tarea_externa = tel.id_tarea_externa
             inner join sucursal so
                on    so.id_sucursal = te.id_sucursal_origen
             left outer join usuario as u
                on    u.id_usuario = tel.id_usuario
             inner join estado_tarea as estado_final
               on    estado_final.id_estado_tarea = tel.id_estado_tarea_fin
             left outer join estado_tarea as estado_inicial
               on    estado_inicial.id_estado_tarea = tel.id_estado_tarea_ini
`

const tareasExternasLog = (ticket, descripcion) => {
    const q = `
        ${mainQuery}
           where te.ticket like ?
           and   te.descripcion like ?
        order by tel.id_tarea_externa_log desc,
                 tel.fecha      
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [ticket, descripcion], (err, data) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
                return
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const tareasExternasLogByTareaExterna = (idTareaExterna) => {
    const q = `
       ${mainQuery}
          where te.id_tarea_externa = ?
       order by tel.id_tarea_externa_log desc,
                 tel.fecha      
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idTareaExterna], (err, data) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
                return
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

export default {
    tareasExternasLog,
    tareasExternasLogByTareaExterna
}
