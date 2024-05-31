import pool from './pool.js'

const mainQuery = `
    select   te.id_tarea_externa,
             te.id_sucursal_origen,
             te.ticket,
             te.descripcion,
             te.id_tipo_trabajo,
             te.id_sucursal_destino,
             te.id_sucursal_redireccion,
             te.id_tarea_local,
             te.fecha_requerida,
             te.hora_requerida,
             te.id_tipo_servicio,
             te.id_estado_tarea,
             te.fecha_creacion,
             te.id_creado_por,
             et.nombre estado_tarea,
             so.nombre sucursal_origen,
             sd.nombre sucursal_destino,
             sr.nombre sucursal_redireccion,
             tt.nombre tipo_trabajo,
             ts.nombre tipo_servicio,
             cp.nombre creado_por
       from  tarea_externa te
             inner join sucursal so
                on    so.id_sucursal = te.id_sucursal_origen
             inner join sucursal sd
                on    sd.id_sucursal = te.id_sucursal_destino
             left outer join sucursal sr
                on    sr.id_sucursal = te.id_sucursal_redireccion
             inner join tipo_trabajo tt
                on    tt.id_tipo_trabajo = te.id_tipo_trabajo
             inner join tipo_servicio ts
                on    ts.id_tipo_servicio = te.id_tipo_servicio
             inner join usuario cp
                on    cp.id_usuario = te.id_creado_por
             inner join estado_tarea et
                on    et.id_estado_tarea = te.id_estado_tarea
`

const tareasExternas = () => {
    const q = `
        ${mainQuery}
           where te.estado = 1
        order by te.fecha_creacion
    `

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
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

const tareasExternasActivas = () => {
    const q = `
        ${mainQuery}
           where te.estado = 1
           and   te.id_estado_tarea != 7
        order by te.fecha_creacion
    `

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
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

const tareasExternasTerminadas = () => {
    const q = `
        ${mainQuery}
           where te.estado = 1
           and   te.id_estado_tarea = 7
        order by te.fecha_creacion
    `

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
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


const porAtenderseHoy = (idSucursal) => {
    const q = `
    select   *
           from  (

                    select  te.id_tarea_externa,
                            te.ticket,
                            te.descripcion,
                            concat(te.fecha_requerida, ' ', te.hora_requerida) as fecha_requerida,
                            so.nombre as sucursal_origen,
                            et.nombre as estado_tarea,
                            ts.nombre as tipo_servicio,
                            tt.nombre as tipo_trabajo,
                            'E' as tipo_tarea
                      from  tarea_externa te
                            inner join estado_tarea et
                                on    et.id_estado_tarea = te.id_estado_tarea
                            inner join tipo_servicio ts
                                on    ts.id_tipo_servicio = te.id_tipo_servicio
                            inner join tipo_trabajo tt
                                on    tt.id_tipo_trabajo = te.id_tipo_trabajo
                            inner join sucursal so
                                on    so.id_sucursal = te.id_sucursal_origen
                      where te.estado = 1
                      and   te.id_estado_tarea = 3                        -- Recibidos para atenderse
                      and   concat(te.fecha_requerida, ' ', te.hora_requerida) < date_add(curdate(), interval 3 day)
                      and   te.id_sucursal_destino = ? 

                    union

                    select  tl.id_tarea_local,
                            tl.ticket,
                            tl.descripcion,
                            concat(tl.fecha_requerida, ' ', tl.hora_requerida) as fecha_requerida,
                            so.nombre as sucursal_origen,
                            et.nombre as estado_tarea,
                            ts.nombre as tipo_servicio,
                            tt.nombre as tipo_trabajo,
                            'L' as tipo_tarea
                      from  tarea_local tl
                            inner join estado_tarea_local et
                                on    et.id_estado_tarea = tl.id_estado_tarea
                            inner join tipo_servicio ts
                                on    ts.id_tipo_servicio = tl.id_tipo_servicio
                            inner join tipo_trabajo tt
                                on    tt.id_tipo_trabajo = tl.id_tipo_trabajo
                            inner join sucursal so
                                on    so.id_sucursal = tl.id_sucursal
                      where tl.estado = 1
                      and   tl.id_estado_tarea = 1                        -- Por atenderse
                      and   tl.id_sucursal = ? 
                 ) x  
        order by fecha_requerida,
                 ticket
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idSucursal, idSucursal], (err, data) => {
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

const tareaExterna = (idTareaExterna) => {
    const q = `
        ${mainQuery}
           where te.id_tarea_externa = ?
        order by te.fecha_creacion
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

const creaTareaExterna = (tareaExterna) => {
    const q = `insert into tarea_externa (
        id_sucursal_origen,
        ticket,
        descripcion,
        id_tipo_trabajo,
        id_sucursal_destino,
        fecha_requerida,
        hora_requerida,
        id_tipo_servicio,
        id_estado_tarea,
        id_creado_por,
        id_modificado_por,
        estado
    ) values (?)` 

    const values = [
        tareaExterna.id_sucursal_origen, 
        tareaExterna.ticket, 
        tareaExterna.descripcion,
        tareaExterna.id_tipo_trabajo,
        tareaExterna.id_sucursal_destino,
        tareaExterna.fecha_requerida,
        tareaExterna.hora_requerida,
        tareaExterna.id_tipo_servicio,
        tareaExterna.id_estado_tarea,
        tareaExterna.id_creado_por,
        tareaExterna.id_creado_por,
        tareaExterna.estado
    ]

    return new Promise((resolve, reject) => {
        pool.query(q, [values], (err, data) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.sqlMessage || err
                })
                return 
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const borraTareaExterna = (idTareaExterna) => {
    const q = `
        delete   
           from  tarea_externa
           where id_tarea_externa = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idTareaExterna], (err, _) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
                return
            }

            resolve({
                status: 200,
                mensaje: 'La tarea externa se borró exitosamente',
                id_tarea_externa: idTareaExterna
            })
        })
    })
}

const actualizaEstadoTareaExterna = (idTareaExterna, idUsuario, idEstadoTarea) => {
    const q = `
        update   tarea_externa
           set   fecha_modificacion = CURRENT_TIMESTAMP,
                 id_modificado_por = ?,
                 id_estado_tarea = ?
           where id_tarea_externa = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idUsuario, idEstadoTarea, idTareaExterna], (err, data) => {
            if (err) {
                reject({
                    status: 500,
                    message: err?.message || err
                })
                return
            }

            resolve({
                status: 200,
                mensaje: 'El estado de la tarea se actualizó exitosamente',
                id_tarea_externa: idTareaExterna,
                id_estado_tarea: idEstadoTarea
            })
        })
    })
}

const redireccionaTareaExterna = (idTareaExterna, idUsuario, idEstadoTarea, idSucursalRedireccion) => {
    const q = `
        update   tarea_externa
           set   fecha_modificacion = CURRENT_TIMESTAMP,
                 id_modificado_por = ?,
                 id_sucursal_redireccion = ?,
                 id_estado_tarea = ?
           where id_tarea_externa = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idUsuario, idSucursalRedireccion, idEstadoTarea, idTareaExterna], (err, data) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
                return
            }

            resolve({
                status: 200,
                mensaje: 'La tarea externa se redireccionó exitosamente',
                id_tarea_externa: idTareaExterna,
                id_estado_tarea: idEstadoTarea,
                id_sucursal_redireccion: idSucursalRedireccion
            })
        })
    })
}

const recolectaRedireccionTareaExterna = (idTareaExterna, idUsuario, idEstadoTarea, idSucursalRedireccion) => {
    const q = `
        update   tarea_externa
           set   fecha_modificacion = CURRENT_TIMESTAMP,
                 id_modificado_por = ?,
                 id_sucursal_destino = ?,
                 id_estado_tarea = ?,
                 id_sucursal_redireccion = null
           where id_tarea_externa = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idUsuario, idSucursalRedireccion, idEstadoTarea, idTareaExterna], (err, data) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
                return
            }

            resolve({
                status: 200,
                mensaje: 'La tarea redireccionada se recolectó exitosamente',
                id_tarea_externa: idTareaExterna,
                id_sucursal_destino: idSucursalRedireccion,
                id_estado_tarea: idEstadoTarea,
                id_sucursal_redireccion: null
            })
        })
    })
}

const cancelaRedireccionTareaLocal = (idTareaExterna, idTareaLocal, idUsuario, idEstadoTarea) => {
    const q1 = `
        update   tarea_local
           set   fecha_modificacion = CURRENT_TIMESTAMP,
                 id_modificado_por = ?,
                 id_estado_tarea = ?
           where id_tarea_local = ?   
    `

    const q2 = `
        delete   
           from  tarea_externa
           where id_tarea_externa = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q1, [idUsuario, idEstadoTarea, idTareaLocal], (err, _) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
                return
            }

            pool.query(q2, [idTareaExterna], (err, _) => {
                if (err) {
                    console.log(err)
                    reject({
                        status: 500,
                        message: err?.message || err
                    })
                    return
                }

                resolve({
                    status: 200,
                    mensaje: 'Se canceló el redireccionamiento de la tarea local exitosamente',
                    id_tarea_externa: idTareaExterna,
                })
            })
        })
    })
}

export default {
    tareasExternas,
    tareasExternasActivas,
    tareasExternasTerminadas,
    porAtenderseHoy,
    tareaExterna,
    creaTareaExterna,
    borraTareaExterna,
    actualizaEstadoTareaExterna,
    redireccionaTareaExterna,
    recolectaRedireccionTareaExterna,
    cancelaRedireccionTareaLocal
}
