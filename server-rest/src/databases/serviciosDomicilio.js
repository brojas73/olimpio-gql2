import pool from './pool.js'

const mainQuery = `
    select   sd.id_servicio_domicilio,
             sd.tipo_servicio,
             sd.id_sucursal,
             sd.fecha_requerida,
             sd.hora_requerida,
             sd.nombre,
             sd.direccion,
             sd.ubicacion,
             sd.telefono,
             sd.ticket,
             sd.id_forma_pago,
             sd.notas_pago,
             sd.pagado,
             sd.referencia_pago,
             sd.fecha_confirmacion_pago,
             sd.id_confirmo_pago,
             sd.id_estado_servicio_domicilio,
             sd.fecha_creacion,
             sd.id_creado_por,
             case sd.tipo_servicio
                when 'R' then
                    'Recolección'
                when 'E' then 
                    'Entrega'
             end as tipo_servicio_descripcion,
             s.nombre as sucursal,
             fp.nombre as forma_pago,
             cp.nombre as confirmo_pago,
             esd.nombre as estado_servicio_domicilio,
             cx.nombre as creado_por
       from  servicio_domicilio sd
             inner join sucursal s
                on    s.id_sucursal = sd.id_sucursal
             left outer join forma_pago fp
                on    fp.id_forma_pago = sd.id_forma_pago
             left outer join usuario cp
                on    cp.id_usuario = sd.id_confirmo_pago
             inner join usuario cx
                on    cx.id_usuario = sd.id_creado_por
             inner join estado_servicio_domicilio esd
                on    esd.id_estado_servicio_domicilio = sd.id_estado_servicio_domicilio
`

const serviciosDomicilio = () => {
    const q = `
        ${mainQuery}
           where sd.estado = 1
        order by sd.fecha_creacion
    `

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
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

const serviciosDomicilioActivos = () => {
    const q = `
        ${mainQuery}
           where sd.estado = 1
           and   sd.id_estado_tarea != 100
        order by sd.fecha_creacion
    `

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
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

const servicioDomicilio = (idServicioDomicilio) => {
    const q = `
        ${mainQuery}
           where sd.id_servicio_domicilio = ?
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

const creaRecoleccion = (servicioDomicilio) => {
    const q = `insert into servicio_domicilio (
        tipo_servicio,
        id_sucursal,
        fecha_requerida,
        hora_requerida,
        nombre,
        direccion,
        ubicacion,
        telefono,
        id_estado_servicio_domicilio,
        id_creado_por,
        id_modificado_por
    ) values (?)` 

    const values = [
        servicioDomicilio.tipo_servicio,
        servicioDomicilio.id_sucursal, 
        servicioDomicilio.fecha_requerida,
        servicioDomicilio.hora_requerida,
        servicioDomicilio.nombre,
        servicioDomicilio.direccion,
        servicioDomicilio.ubicacion,
        servicioDomicilio.telefono,
        servicioDomicilio.id_estado_servicio_domicilio,
        servicioDomicilio.id_usuario,
        servicioDomicilio.id_usuario
    ]

    return new Promise((resolve, reject) => {
        pool.query(q, [values], (err, data) => {
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

const creaEntrega = (servicioDomicilio) => {
    const q = `insert into servicio_domicilio (
        id_sucursal,
        tipo_servicio,
        ticket,
        id_forma_pago,
        notas_pago,
        fecha_requerida,
        hora_requerida,
        nombre,
        direccion,
        ubicacion,
        telefono,
        id_estado_servicio_domicilio,
        id_creado_por,
        id_modificado_por
    ) values (?)` 

    const values = [
        servicioDomicilio.id_sucursal, 
        servicioDomicilio.tipo_servicio,
        servicioDomicilio.ticket,
        servicioDomicilio.id_forma_pago,
        servicioDomicilio.notas_pago,
        servicioDomicilio.fecha_requerida,
        servicioDomicilio.hora_requerida,
        servicioDomicilio.nombre,
        servicioDomicilio.direccion,
        servicioDomicilio.ubicacion,
        servicioDomicilio.telefono,
        servicioDomicilio.id_estado_servicio_domicilio,
        servicioDomicilio.id_usuario,
        servicioDomicilio.id_usuario
    ]

    return new Promise((resolve, reject) => {
        pool.query(q, [values], (err, data) => {
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


const borraServicioDomicilio = (idServicioDomicilio) => {
    const q = `
        delete   
           from  servicio_domicilio
           where id_servicio_domicilio = ?   
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

            resolve({
                status: 200,
                mensaje: 'El servicio a domicilio se borró exitosamente',
                id_servicio_domicilio: idServicioDomicilio
            })
        })
    })
}

const actualizaEstadoServicioDomicilio = (idServicioDomicilio, idUsuario, idEstadoServicioDomicilio) => {
    const q = `
        update   servicio_domicilio
           set   fecha_modificacion = CURRENT_TIMESTAMP,
                 id_modificado_por = ?,
                 id_estado_servicio_domicilio = ?
           where id_servicio_domicilio = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idUsuario, idEstadoServicioDomicilio, idServicioDomicilio], (err, data) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
            }

            resolve({
                status: 200,
                mensaje: 'El estado del servicio a domicilio se actualizó exitosamente',
                id_servicio_domicilio: idServicioDomicilio,
                id_estado_servicio_domicilio: idEstadoServicioDomicilio
            })
        })
    })
}

const actualizaInfoPagoServicioDomicilio = (idServicioDomicilio, idFormaPago, notasPago, pagado, referenciaPago, idUsuario) => {
    const q = `
        update   servicio_domicilio
           set   fecha_modificacion = CURRENT_TIMESTAMP,
                 id_modificado_por = ?,
                 id_forma_pago = ?,
                 notas_pago = ?,
                 pagado = ?,
                 referencia_pago = ?,
                 id_confirmo_pago = ?,
                 fecha_confirmacion_pago = CURRENT_TIMESTAMP
           where id_servicio_domicilio = ?   
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [idUsuario, idFormaPago, notasPago, pagado, referenciaPago, idUsuario, idServicioDomicilio], (err) => {
            if (err) {
                console.log(err)
                reject({
                    status: 500,
                    message: err?.message || err
                })
            }

            resolve({
                status: 200,
                mensaje: 'La información de pago del servicio a domicilio se actualizó exitosamente',
                id_servicio_domicilio: idServicioDomicilio,
                pagado: pagado
            })
        })
    })
}

export default {
    serviciosDomicilio,
    serviciosDomicilioActivos,
    servicioDomicilio,
    creaRecoleccion,
    creaEntrega,
    borraServicioDomicilio,
    actualizaEstadoServicioDomicilio,
    actualizaInfoPagoServicioDomicilio,
}
