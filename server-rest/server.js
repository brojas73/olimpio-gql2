require('dotenv').config()

const express = require('express') 
const cors = require('cors')
const mysql = require('mysql')

const port = process.env.PORT || 3020

const app = express();
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Ol!mp!0!!@@",
    database: "olimpio"
})

app.use(cors());
app.use(express.json())

/**
 * Login y Usuarios
 */

app.post('/api/login', (req, res) => {
    const { usuario, contrasena } = req.body
    const q = 'select * from usuario where usuario = ? and contrasena = ? and estado = 1'

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [usuario, contrasena], (err, data) => {
            db.release()

            if (err) {
                res.send(err)
            } 
    
            if (data) {
                res.send(data)
            } else {
                res.send({ mensaje: 'Combinación de usuario/contraseña no encontrada'})
            }
        })
    })
})

app.use('/api/usuarios', (req, res) => {
    const q = `select   id_usuario,
                        usuario,
                        nombre,
                        email,
                        id_rol 
                from    usuario 
                where   estado = 1`
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }
    
            res.send(data)
            
        })
    })
})


/**
 * Catálogos
 */

app.use('/api/sucursales', (req, res) => {
    const q = 'select * from sucursal where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err

        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/roles', (req, res) => {
    const q = 'select * from rol where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/tipos-trabajo', (req, res) => {
    const q = 'select * from tipo_trabajo where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/tipos-servicio', (req, res) => {
    const q = 'select * from tipo_servicio where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/estados-tarea', (req, res) => {
    const q = 'select * from estado_tarea where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/estados-servicio-domicilio', (req, res) => {
    const q = 'select * from estado_servicio_domicilio where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.use('/api/formas-pago', (req, res) => {
    const q = 'select * from forma_pago where estado = 1'
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})


/**
 * Tareas Externas QUERIES
 */

app.use('/api/tareas-externas-activas', (req, res) => {
    const q = `
        select      te.id_tarea_externa,
                    te.id_sucursal_origen,
                    te.ticket,
                    te.descripcion,
                    te.id_sucursal_destino,
                    te.id_sucursal_redireccion,
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
            from    tarea_externa te
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
            where   te.id_estado_tarea != 7 
            and     te.estado = 1
        order by    te.fecha_creacion
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/tareas-externas', (req, res) => {
    const q = `
        select   te.id_tarea_externa,
                 te.id_sucursal_origen,
                 te.ticket,
                 te.descripcion,
                 te.id_tipo_trabajo,
                 te.id_sucursal_destino,
                 te.id_sucursal_redireccion,
                 te.fecha_requerida,
                 te.hora_requerida,
                 te.id_tipo_servicio,
                 te.id_estado_tarea,
                 te.fecha_creacion,
                 te.id_creado_por,
                 te.fecha_modificacion,
                 te.id_modificado_por,
                 te.estado,
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
           where te.estado = 1
        order by te.fecha_creacion
    `
    
    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/tareas-externas/:id_tarea_externa', (req, res) => {
    const { id_tarea_externa } = req.params
    const q = `
        select   te.id_tarea_externa,
                 te.id_sucursal_origen,
                 te.ticket,
                 te.descripcion,
                 te.id_tipo_trabajo,
                 te.id_sucursal_destino,
                 te.id_sucursal_redireccion,
                 te.fecha_requerida,
                 te.hora_requerida,
                 te.id_tipo_servicio,
                 te.id_estado_tarea,
                 te.fecha_creacion,
                 te.id_creado_por,
                 te.fecha_modificacion,
                 te.id_modificado_por,
                 te.estado,
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
                 left outer join sucursa sr
                    on    sr.id_sucursal = te.id_sucursal_redireccion
                 inner join tipo_trabajo tt
                   on    tt.id_tipo_trabajo = te.id_tipo_trabajo
                 inner join tipo_servicio ts
                   on    ts.id_tipo_servicio = te.id_tipo_servicio
                 inner join usuario cp
                   on    cp.id_usuario = te.id_creado_por
                 inner join estado_tarea et
                   on    et.id_estado_tarea = te.id_estado_tarea
           where te.id_tarea_externa = ?
        order by te.fecha_creacion
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [id_tarea_externa], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/tareas-externas-log', (req, res) => {
    let { ticket, descripcion } = req.query

    // Si no recibimos el ticket
    if (!ticket) ticket = '%'
    if (!descripcion) descripcion = '%'

    const q = `
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
                 inner join estado_tarea as estado_inicial
                    on    estado_inicial.id_estado_tarea = tel.id_estado_tarea_ini
           where te.ticket like ?
           and   te.descripcion like ?
        order by tel.id_tarea_externa_log desc,
                 tel.fecha      
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [ticket, descripcion], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/tareas-externas-log/:id_tarea_externa', (req, res) => {
    let { id_tarea_externa } = req.params

    const q = `
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
                 inner join estado_tarea as estado_inicial
                    on    estado_inicial.id_estado_tarea = tel.id_estado_tarea_ini
           where tel.id_tarea_externa = ?
        order by tel.id_tarea_externa_log desc,
                 tel.fecha      
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [id_tarea_externa], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/tareas-por-atenderse-hoy/:id_sucursal_destino', (req, res) => {
    const { id_sucursal_destino } = req.params

    const q = `
        select   te.id_tarea_externa,
                 te.ticket,
                 te.descripcion,
                 concat(te.fecha_requerida, ' ', te.hora_requerida) as fecha_requerida,
                 so.nombre as sucursal_origen,
                 et.nombre as estado_tarea,
                 ts.nombre as tipo_servicio,
                 tt.nombre as tipo_trabajo
           from  tarea_externa te
                 inner join estado_tarea et
                    on    et.id_estado_tarea = te.id_estado_tarea
                 inner join tipo_servicio ts
                    on    ts.id_tipo_servicio = te.id_tipo_servicio
                 inner join tipo_trabajo tt
                    on    tt.id_tipo_trabajo = te.id_tipo_trabajo
                 inner join sucursal so
                    on    so.id_sucursal = te.id_sucursal_origen
           where te.id_estado_tarea = 3
           and   te.estado = 1
           and   concat(te.fecha_requerida, ' ', te.hora_requerida) < date_add(curdate(), interval 1 day)
           and   te.id_sucursal_destino = ? 
        order by te.fecha_creacion  
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [id_sucursal_destino], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err) 
            }

            res.send(data)
        })
    })
})

/**
 * Tareas Externas MODIFIERS
 */

app.post("/api/tareas-externas", (req, res) => {
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
        req.body.id_sucursal_origen, 
        req.body.ticket, 
        req.body.descripcion,
        req.body.id_tipo_trabajo,
        req.body.id_sucursal_destino,
        req.body.fecha_requerida,
        req.body.hora_requerida,
        req.body.id_tipo_servicio,
        req.body.id_estado_tarea,
        req.body.id_creado_por,
        req.body.id_creado_por,
        req.body.estado
    ]

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [values], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }
            res.send({"status": 200, "mensaje": "La tarea se creó exitosamente"})
        })
    })
})

app.delete('/api/tareas-externas/:id_tarea_externa', (req, res) => {
    try {
        const { id_tarea_externa } = req.params
        const q = 'delete from tarea_externa where id_tarea_externa = ?'
        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, [id_tarea_externa], (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send({
                        status: 500,
                        mesnsaje: 'Hubo problemas para borrar la tarea',
                        error: err
                    })
                }
                res.send({
                    status: 200,
                    mensaje: "La tarea se borró exitosamente",
                    id_tarea_externa: id_tarea_externa
                })
            })
        }) 
    } catch (err) {
        console.log('delete', err)
    }
})

app.put('/api/tareas-externas/:id_tarea_externa', (req, res) => {
    try {
        const { id_tarea_externa } = req.params
        const { id_estado_tarea, id_sucursal_redireccion, id_usuario, tipo_accion } = req.body
        let q, params

        // console.log('server.tareas-externas.params', req.params)
        // console.log('server.tareas-externas.body', req.body)
        // return

        // Si es el tipo de opcion por devfault
        if (!tipo_accion) { 
            q = `update   tarea_externa
                    set   fecha_modificacion = CURRENT_TIMESTAMP,
                          id_modificado_por = ?,
                          id_estado_tarea = ?
                    where id_tarea_externa = ?`

            params = [id_usuario, id_estado_tarea, id_tarea_externa]
        } else if (tipo_accion === 'redireccion') {
            q = `update   tarea_externa
                    set   fecha_modificacion = CURRENT_TIMESTAMP,
                          id_modificado_por = ?,
                          id_estado_tarea = ?,
                          id_sucursal_redireccion = ?
                    where id_tarea_externa = ?`
            params = [id_usuario, id_estado_tarea, id_sucursal_redireccion, id_tarea_externa]
        } else if (tipo_accion === 'recolecta-redireccion') {
            q = `update   tarea_externa
                    set   fecha_modificacion = CURRENT_TIMESTAMP,
                          id_modificado_por = ?,
                          id_estado_tarea = ?,
                          id_sucursal_destino = ?,
                          id_sucursal_redireccion = null
                    where id_tarea_externa = ?`
            params = [id_usuario, id_estado_tarea, id_sucursal_redireccion, id_tarea_externa]
        }

        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, params, (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send({
                        status: 500,
                        mensaje: 'Hubo problemas para actualizar el estado de la tarea',
                        error: err
                    })
                }
                res.send({
                    status: 200, 
                    mensaje: "El estado se cambió con éxito",
                    id_tarea_externa: id_tarea_externa,
                    id_estado_tarea: id_estado_tarea,
                    id_sucursal_redireccion: id_sucursal_redireccion,
                    id_usuario: id_usuario
                })
            })
        }) 
    } catch (err) {
        console.log('update', err)
    }
})

app.put('/api/tarea-externa/:id_tarea_externa', (req, res) => {
    try {
        const { id_tarea_externa } = req.params
        const { id_estado_tarea, id_sucursal_redireccion, id_usuario } = req.body
        const q = `update   tarea_externa
                       set  fecha_modificacion = CURRENT_TIMESTAMP,
                            id_modificado_por = ?,
                            id_estado_tarea = ?,
                            id_sucursal_redireccion = ?
                      where id_tarea_externa = ?`
        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, [id_usuario, id_estado_tarea, id_sucursal_redireccion, id_tarea_externa], (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send({
                        status: 500,
                        mensaje: 'Hubo problemas para actualizar el estado de la tarea',
                        error: err
                    })
                }
                res.send({
                    status: 200, 
                    mensaje: "El estado se cambió con éxito",
                    id_tarea_externa: id_tarea_externa,
                    id_estado_tarea: id_estado_tarea,
                    id_usuario: id_usuario
                })
            })
        }) 
    } catch (err) {
        console.log('update', err)
    }
})


/**
 * Servicios a Domicilio QUERIES
 * 
 */

app.get('/api/servicios-domicilio', (req, res) => {
    const q = `
        select   sd.id_servicio_domicilio,
                 sd.tipo_servicio,
                 sd.id_sucursal,
                 sd.fecha_requerida,
                 sd.hora_requerida,
                 sd.nombre,
                 sd.direccion,
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
           where sd.estado = 1
        order by sd.fecha_creacion
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/servicios-domicilio-activos', (req, res) => {
    const q = `
        select   sd.id_servicio_domicilio,
                 sd.tipo_servicio,
                 sd.id_sucursal,
                 sd.fecha_requerida,
                 sd.hora_requerida,
                 sd.nombre,
                 sd.direccion,
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
           where sd.id_estado_servicio_domicilio != 100
           and   sd.estado = 1
        order by sd.fecha_creacion
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/servicios-domicilio-por-pagar', (req, res) => {
    const q = `
        select   sd.id_servicio_domicilio,
                 sd.tipo_servicio,
                 sd.id_sucursal,
                 sd.fecha_requerida,
                 sd.hora_requerida,
                 sd.nombre,
                 sd.direccion,
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
           where sd.pagado = 'N'
           and   sd.estado = 1
        order by sd.fecha_creacion
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/servicios-domicilio/:id_servicio_domicilio', (req, res) => {
    const { id_servicio_domicilio } = req.params
    const q = `
        select   sd.id_servicio_domicilio,
                 sd.tipo_servicio,
                 sd.id_sucursal,
                 sd.fecha_requerida,
                 sd.hora_requerida,
                 sd.nombre,
                 sd.direccion,
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
           where sd.id_servicio_domicilio = ?
        order by sd.fecha_creacion
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [id_servicio_domicilio], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

app.get('/api/servicios-domicilio-log/:id_servicio_domicilio', (req, res) => {
    let { id_servicio_domicilio } = req.params

    const q = `
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
           where sdl.id_servicio_domicilio = ?
        order by sdl.id_servicio_domicilio_log desc,
                 sdl.fecha      
    `

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [id_servicio_domicilio], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }

            res.send(data)
        })
    })
})

/**
 * Servicios a Domicilio MODIFIERS  
 */

app.post("/api/servicios-domicilio", (req, res) => {
    const q = `insert into servicio_domicilio (
                  tipo_servicio,
                  id_sucursal,
                  fecha_requerida,
                  hora_requerida,
                  nombre,
                  direccion,
                  telefono,
                  ticket,
                  id_estado_servicio_domicilio,
                  id_creado_por,
                  id_modificado_por
              ) values (?)` 
    const values = [
        req.body.tipo_servicio,
        req.body.id_sucursal, 
        req.body.fecha_requerida,
        req.body.hora_requerida,
        req.body.nombre,
        req.body.direccion,
        req.body.telefono,
        req.body.ticket,
        req.body.id_estado_servicio_domicilio,
        req.body.id_usuario,
        req.body.id_usuario
    ]

    pool.getConnection((err, db) => {
        if (err) throw err
        db.query(q, [values], (err, data) => {
            db.release()
            if (err) {
                console.log(err)
                res.send(err)
            }
            res.send({"status": 200, "mensaje": "El servicio a domicilio se creó exitosamente"})
        })
    })
})

app.delete('/api/servicios-domicilio/:id_servicio_domicilio', (req, res) => {
    try {
        const { id_servicio_domicilio } = req.params
        const q = 'delete from servicio_domicilio where id_servicio_domicilio = ?'
        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, [id_servicio_domicilio], (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send({
                        status: 500,
                        mesnsaje: 'Hubo problemas para borrar el servicio a domicilio',
                        error: err
                    })
                }
                res.send({
                    status: 200,
                    mensaje: "El servicio a domicilio se borró exitosamente",
                    id_servicio_domicilio: id_servicio_domicilio
                })
            })
        }) 
    } catch (err) {
        console.log('delete', err)
    }
})

app.put('/api/servicios-domicilio/:id_servicio_domicilio', (req, res) => {
    try {
        const { id_servicio_domicilio } = req.params
        const { id_estado_servicio_domicilio, id_usuario } = req.body
        const q = `update   servicio_domicilio
                       set  fecha_modificacion = CURRENT_TIMESTAMP,
                            id_modificado_por = ?,
                            id_estado_servicio_domicilio = ?
                      where id_servicio_domicilio = ?`
        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, [id_usuario, id_estado_servicio_domicilio, id_servicio_domicilio], (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send({
                        status: 500,
                        mensaje: 'Hubo problemas para actualizar el estado del servicio a domicilio',
                        error: err
                    })
                }
                res.send({
                    status: 200, 
                    mensaje: "El estado se cambió con éxito",
                    id_servicio_domicilio: id_servicio_domicilio,
                    id_estado_servicio_domicilio: id_estado_servicio_domicilio,
                    id_usuario: id_usuario
                })
            })
        }) 
    } catch (err) {
        console.log('update', err)
    }
})

app.put('/api/servicios-domicilio-info-pago/:id_servicio_domicilio', (req, res) => {
    try {
        const { id_servicio_domicilio } = req.params
        const { infoPago: { id_forma_pago, notas_pago, confirmar_pago, referencia_pago, id_usuario} } = req.body
        const pagado = confirmar_pago ? 'Y' : 'N' 
        let q = ''
        let params = []

        if (confirmar_pago) {
            q = `update   servicio_domicilio
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
            params = [id_usuario, id_forma_pago, notas_pago, pagado, referencia_pago, id_usuario, id_servicio_domicilio ]
        } else {
            q = `update   servicio_domicilio
                    set   fecha_modificacion = CURRENT_TIMESTAMP,
                          id_modificado_por = ?,
                          id_forma_pago = ?,
                          notas_pago = ?
                    where id_servicio_domicilio = ?
                `
            params = [id_usuario, id_forma_pago, notas_pago, id_servicio_domicilio]
        }

        pool.getConnection((err, db) => {
            if (err) throw err
            db.query(q, params, (err, data) => {
                db.release()
                if (err) {
                    console.log(err)
                    res.send({
                        status: 500,
                        mensaje: 'Hubo problemas para actualizar el estado del servicio a domicilio',
                        error: err
                    })
                }
                res.send({
                    status: 200, 
                    mensaje: "La información de pago del servicio a domicilio se cambió con éxito",
                    id_servicio_domicilio: id_servicio_domicilio,
                    id_forma_pago: id_forma_pago,
                    notas_pago: notas_pago,
                    pagado: pagado,
                    referencia_pago: referencia_pago,
                    id_confirmo_pago: id_usuario
                })
            })
        }) 
    } catch (err) {
        console.log('update', err)
    }
})


app.listen(port, () => console.log(`API is running on port ${port}`));
