import pool from './pool.js'

const mainQuery = `
    select   tl.id_tarea_local,
             tl.id_sucursal,
             tl.ticket,
             tl.descripcion,
             tl.id_tipo_trabajo,
             tl.fecha_requerida,
             tl.hora_requerida,
             tl.id_tipo_servicio,
             tl.id_estado_tarea,
             tl.fecha_creacion,
             tl.id_creado_por,
             etl.nombre estado_tarea,
             s.nombre sucursal,
             tt.nombre tipo_trabajo,
             ts.nombre tipo_servicio,
             cp.nombre creado_por
       from  tarea_local tl
             inner join sucursal s
                on    s.id_sucursal = tl.id_sucursal
             inner join tipo_trabajo tt
                on    tt.id_tipo_trabajo = tl.id_tipo_trabajo
             inner join tipo_servicio ts
                on    ts.id_tipo_servicio = tl.id_tipo_servicio
             inner join usuario cp
                on    cp.id_usuario = tl.id_creado_por
             inner join estado_tarea_local etl
                on    etl.id_estado_tarea = tl.id_estado_tarea
`

const tareasLocales = () => {
    const q = `
        ${mainQuery}
           where tl.estado = 1
        order by tl.fecha_creacion
    `

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
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

const tareasLocalesActivas = () => {
    const q = `
        ${mainQuery}
           where tl.estado = 1
           and   tl.id_estado_tarea != 3
        order by tl.fecha_creacion
    `

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
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

const porAtenderseHoy = (idSucursal) => {
    const q = `
        select   tl.id_tarea_local,
                 tl.ticket,
                 tl.descripcion,
                 concat(tl.fecha_requerida, ' ', tl.hora_requerida) as fecha_requerida,
                 s.nombre as sucursal,
                 et.nombre as estado_tarea,
                 ts.nombre as tipo_servicio,
                 tt.nombre as tipo_trabajo
           from  tarea_local tl
                 inner join estado_tarea et
                    on    et.id_estado_tarea = tl.id_estado_tarea
                 inner join tipo_servicio ts
                    on    ts.id_tipo_servicio = tl.id_tipo_servicio
                 inner join tipo_trabajo tt
                    on    tt.id_tipo_trabajo = tl.id_tipo_trabajo
                 inner join sucursal s
                    on    s.id_sucursal = tl.id_sucursal
           where te.estado = 1
           and   tl.id_estado_tarea = 1                        -- Por atenderse
           and   concat(tl.fecha_requerida, ' ', tl.hora_requerida) < date_add(curdate(), interval 1 day)
           and   tl.id_sucursal = ? 
        order by tl.fecha_creacion  
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idSucursal], (err, data) => {
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

const tareaLocal = (idTareaLocal) => {
    const q = `
        ${mainQuery}
           where tl.id_tarea_local = ?
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

const creaTareaLocal = (tareaLocal) => {
    const q = `insert into tarea_local (
        id_sucursal,
        ticket,
        descripcion,
        id_tipo_trabajo,
        fecha_requerida,
        hora_requerida,
        id_tipo_servicio,
        id_estado_tarea,
        id_creado_por,
        id_modificado_por
    ) values (?)` 

    const values = [
        tareaLocal.id_sucursal, 
        tareaLocal.ticket, 
        tareaLocal.descripcion,
        tareaLocal.id_tipo_trabajo,
        tareaLocal.fecha_requerida,
        tareaLocal.hora_requerida,
        tareaLocal.id_tipo_servicio,
        tareaLocal.id_estado_tarea,
        tareaLocal.id_creado_por,
        tareaLocal.id_creado_por,
    ]

    return new Promise((resolve, reject) => {
        pool.query(q, [values], (err, data) => {
            if (err) {
                return reject({
                    status: 500,
                    message: err?.sqlMessage || err
                })
            }

            return resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const borraTareaLocal = (idTareaLocal) => {
    const q = `
        delete   
           from  tarea_local
           where id_tarea_local = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idTareaLocal], (err, _) => {
            if (err) {
                return reject({
                    status: 500,
                    message: err?.message || err
                })
            }

            return resolve({
                status: 200,
                mensaje: 'La tarea local se borró exitosamente',
                id_tarea_local: idTareaLocal
            })
        })
    })
}

const actualizaEstadoTareaLocal = (idTareaLocal, idUsuario, idEstadoTarea) => {
    const q = `
        update   tarea_local
           set   fecha_modificacion = CURRENT_TIMESTAMP,
                 id_modificado_por = ?,
                 id_estado_tarea = ?
           where id_tarea_local = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idUsuario, idEstadoTarea, idTareaLocal], (err, data) => {
            if (err) {
                console.log(err)
                return reject({
                    status: 500,
                    message: err?.message || err
                })
            }

            return resolve({
                status: 200,
                mensaje: 'El estado de la tarea se actualizó exitosamente',
                id_tarea_local: idTareaLocal,
                id_estado_tarea: idEstadoTarea
            })
        })
    })
}

export default {
    tareasLocales,
    tareasLocalesActivas,
    porAtenderseHoy,
    tareaLocal,
    creaTareaLocal,
    borraTareaLocal,
    actualizaEstadoTareaLocal,
}
