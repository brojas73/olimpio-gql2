import tareasExternasService from "../services/tareasExternasService.js"

const tareasExternas = async (_, res) => {
    const tareasExternas = await tareasExternasService.tareasExternas()
    res.send({status: "OK", data: tareasExternas})
}

const tareasExternasActivas = async (_, res) => {
    const tareasExternas = await tareasExternasService.tareasExternasActivas()
    res.send({status: "OK", data: tareasExternas})
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

    const tareasExternas = await tareasExternasService.porAtenderseHoy(idSucursal)
    res.send({status: "OK", data: tareasExternas})
}

const tareaExterna = async (req, res) => {
    const { 
        params: { idTareaExterna }
    } = req

    if (!idTareaExterna) {
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
    
    const tareaExterna = await tareasExternasService.tareaExterna(idTareaExterna)
    res.send({status: "OK", data: tareaExterna})
}

const creaTareaExterna = async (req, res) => {
    const { body } = req

    if (
        !body.id_sucursal_origen ||
        !body.ticket ||
        !body.descripcion ||
        !body.id_tipo_trabajo ||
        !body.id_sucursal_destino ||
        !body.fecha_requerida ||
        !body.hora_requerida ||
        !body.id_tipo_servicio ||
        !body.id_estado_tarea ||
        !body.id_creado_por ||
        !body.id_creado_por ||
        !body.estado
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: `
                        Alguno de los campos faltó o está vacío en el cuerpo de la petición: 
                        'id_sucursal_origen', 'ticket', 'descripcion', 'id_tipo_trabajo', 'fecha_requerida',
                        'hora_requerida', 'id_tipo_servicio', 'id_estado_tarea', 'id_creado_por', 'estado'
                    `
                }
            })

        return
    }

    try {
        const tareaExterna = await tareasExternasService.creaTareaExterna(req.body)
        res.status(201).send({status: "OK", data: tareaExterna})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const borraTareaExterna = async (req, res) => {
    const { 
        params: { idTareaExterna }
    } = req

    if (!idTareaExterna) {
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

    try {
        const tareaExterna = await tareasExternasService.borraTareaExterna(idTareaExterna)
        res.status(204).send({status: "OK", tareaExterna})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const actualizaEstadoTareaExterna = async (req, res) => {
    const { 
        params: { idTareaExterna },
        body:   { id_estado_tarea, id_sucursal_redireccion, id_usuario, tipo_accion }
    } = req
    let tareaExterna = {}

    if (!idTareaExterna ) {
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
            tareaExterna = await tareasExternasService.actualizaEstadoTareaExterna(idTareaExterna, id_usuario, id_estado_tarea)
        else if (tipo_accion === 'redireccion')
            tareaExterna = await tareasExternasService.redireccionaTareaExterna(idTareaExterna, id_usuario, id_sucursal_redireccion, id_estado_tarea)
        else if (tipo_accion === 'recolecta-redireccion')
            tareaExterna = await tareasExternasService.recolectaRedireccionTareaExterna(idTareaExterna, id_usuario, id_sucursal_redireccion, id_estado_tarea)

        res.send({status: "OK", data: tareaExterna})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

export default {
    tareasExternas,
    tareasExternasActivas,
    porAtenderseHoy,
    tareaExterna,
    creaTareaExterna,
    borraTareaExterna,
    actualizaEstadoTareaExterna
}
