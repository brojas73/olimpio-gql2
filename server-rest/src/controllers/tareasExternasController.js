import tareasExternasService from "../services/tareasExternasService.js"

const tareasExternas = async (_, res) => {
    const tareasExternas = await tareasExternasService.tareasExternas()
    res.send(tareasExternas)
}

const tareasExternasActivas = async (_, res) => {
    const tareasExternas = await tareasExternasService.tareasExternasActivas()
    res.send(tareasExternas)
}

const porAtenderseHoy = async (req, res) => {
    const { idSucursal } = req.params 
    const tareasExternas = await tareasExternasService.porAtenderseHoy(idSucursal)
    res.send(tareasExternas)
}

const tareaExterna = async (req, res) => {
    const { idTareaExterna } = req.params 
    const tareaExterna = await tareasExternasService.tareaExterna(idTareaExterna)
    res.send(tareaExterna)
}

const creaTareaExterna = async (req, res) => {
    const tareaExterna = await tareasExternasService.creaTareaExterna(req.body)
    res.send(tareaExterna)
}

const borraTareaExterna = async (req, res) => {
    const { idTareaExterna } = req.params
    const tareaExterna = await tareasExternasService.borraTareaExterna(idTareaExterna)
    res.send(tareaExterna)
}

const actualizaEstadoTareaExterna = async (req, res) => {
    const { idTareaExterna } = req.params
    const { id_estado_tarea, id_sucursal_redireccion, id_usuario, tipo_accion } = req.body
    let tareaExterna = {}

    if (!tipo_accion)
        tareaExterna = await tareasExternasService.actualizaEstadoTareaExterna(idTareaExterna, id_usuario, id_estado_tarea)
    else if (tipo_accion === 'redireccion')
        tareaExterna = await tareasExternasService.redireccionaTareaExterna(idTareaExterna, id_usuario, id_sucursal_redireccion, id_estado_tarea)
    else if (tipo_accion === 'recolecta-redireccion')
        tareaExterna = await tareasExternasService.recolectaRedireccionTareaExterna(idTareaExterna, id_usuario, id_sucursal_redireccion, id_estado_tarea)

    res.send(tareaExterna)
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
