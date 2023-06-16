import tareasLocalesService from "../services/tareasLocalesService.js"

const tareasLocales = async (_, res) => {
    const tareas = await tareasLocalesService.tareasLocales()
    res.send({status: "OK", data: tareas})
}

const tareasLocalesActivas = async (_, res) => {
    const tareas = await tareasLocalesService.tareasLocalesActivas()
    res.send({status: "OK", data: tareas})
}

const porAtenderseHoy = async (req, res) => {
    const { 
        params: { idSucursal }
    } = req 
    
    if (!idSucursal) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 'No se recibió el parámetro idSucursal'
                }
            })
        return
    }

    const tareas = await tareasLocalesService.porAtenderseHoy(idSucursal)
    res.send({status: "OK", data: tareas})
}

const tareaLocal = async (req, res) => {
    const { 
        params: { idTareaLocal }
    } = req

    if (!idTareaLocal) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 'No se recibió el parámetro idTareaExterna'
                }
            })
        return
    }
    
    const tarea = await tareasLocalesService.tareaLocal(idTareaLocal)
    res.send({status: "OK", data: tarea})
}

const creaTareaLocal = async (req, res) => {
    const { body } = req

    if (
        !body.id_sucursal ||
        !body.ticket ||
        !body.descripcion ||
        !body.id_tipo_trabajo ||
        !body.fecha_requerida ||
        !body.hora_requerida ||
        !body.id_tipo_servicio ||
        !body.id_estado_tarea ||
        !body.id_creado_por
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: `
                        Alguno de los campos faltó o está vacío en el cuerpo de la petición: 
                        'id_sucursal', 'ticket', 'descripcion', 'id_tipo_trabajo', 'fecha_requerida',
                        'hora_requerida', 'id_tipo_servicio', 'id_estado_tarea', 'id_creado_por'
                    `
                }
            })
        return
    }

    try {
        const tarea = await tareasLocalesService.creaTareaLocal(req.body)
        return res.status(201).send({status: "OK", data: tarea})
    } catch (error) {
        return res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const borraTareaLocal = async (req, res) => {
    const { 
        params: { idTareaLocal }
    } = req

    if (!idTareaLocal) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 'No se recibió el parámetro idTareaLocal'
                }
            })
        return
    }

    try {
        const tarea = await tareasLocalesService.borraTareaLocal(idTareaLocal)
        res.send({status: "OK", data: tarea})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const actualizaEstadoTareaLocal = async (req, res) => {
    const { 
        params: { idTareaLocal },
        body:   { id_estado_tarea, id_sucursal_redireccion, id_usuario, tipo_accion }
    } = req
    let tareaLocal = {}

    if (!idTareaLocal ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 'No se recibió el parámetro idTareaLocal'
                }
            })
        return
    }

    if (
        !id_estado_tarea ||
        !id_usuario
    ) {
        res
            .status(401)
            .send({
                status: "FAILED",
                data: {
                    error: `
                        Alguno de los campos faltó o está vacío en el cuerpo de la petición: 
                        'id_estado_tarea', 'id_usuario'
                    `
                }
            })
        return
    }

    if (
        tipo_accion && 
        !id_sucursal_redireccion
    ) {
        res
            .status(402)
            .send({
                status: "FAILED",
                data: {
                    error: `
                        Cuando se está redireccionado una tarea, se requiere el campo id_sucursal_redireccion en el cuerpo de la petición
                    `
                }
            })
        return
    }


    try {
        if (!tipo_accion)
            tareaLocal = await tareasLocalesService.actualizaEstadoTareaLocal(idTareaLocal, id_usuario, id_estado_tarea)
        else if (tipo_accion === 'redireccion')
            tareaLocal = await tareasLocalesService.redireccionaTareaLocal(idTareaLocal, id_usuario, id_sucursal_redireccion, id_estado_tarea)
        res.send({status: "OK", data: tareaLocal})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

export default {
    tareasLocales,
    tareasLocalesActivas,
    porAtenderseHoy,
    tareaLocal,
    creaTareaLocal,
    borraTareaLocal,
    actualizaEstadoTareaLocal
}
