import pool from './pool.js'

const mainQuery = `
    select   tl.ticket,
             so.nombre sucursal,
             tl.descripcion,
             case tll.id_tipo_accion
                when 1 then
                   'Creación'
                when 2 then 
                   'Borrado'
                when 3 then 
                   'Actualización'
             end as tipo_accion,
             tll.fecha, 
             u.nombre as usuario,
             estado_final.nombre as estado_fin,
             estado_inicial.nombre as estado_ini,
             tl.id_tarea_local as id_tarea_local,
             tl.id_sucursal,
             tll.id_tarea_local_log as id
       from  tarea_local_log as tll
             inner join tarea_local as tl
                on    tl.id_tarea_local = tll.id_tarea_local
             inner join sucursal so
                on    so.id_sucursal = tl.id_sucursal
             left outer join usuario as u
                on    u.id_usuario = tll.id_usuario
             inner join estado_tarea as estado_final
               on    estado_final.id_estado_tarea = tll.id_estado_tarea_fin
             inner join estado_tarea as estado_inicial
               on    estado_inicial.id_estado_tarea = tll.id_estado_tarea_ini
`

const tareasLocalesLog = (ticket, descripcion) => {
    const q = `
        ${mainQuery}
           where tl.ticket like ?
           and   tl.descripcion like ?
        order by tll.id_tarea_local_log desc,
                 tll.fecha      
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [ticket, descripcion], (err, data) => {
            if (err) {
                console.log(err)
                return reject({
                    status: 500,
                    message: err?.message || err
                })
            }

            return resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const tareasLocalesLogByTareaLocal = (idTareaLocal) => {
    const q = `
       ${mainQuery}
          where tl.id_tarea_local = ?
       order by tll.id_tarea_local_log desc,
                tll.fecha      
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idTareaLocal], (err, data) => {
            if (err) {
                console.log(err)
                return reject({
                    status: 500,
                    message: err?.message || err
                })
            }

            return resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

export default {
    tareasLocalesLog,
    tareasLocalesLogByTareaLocal
}
