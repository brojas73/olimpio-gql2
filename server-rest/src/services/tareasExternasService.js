import DB from '../databases/tareasExternas.js'

const tareasExternas = async () => {
    const tareasExternas = await DB.tareasExternas()
    return ({status: "OK", data: tareasExternas})
}

const tareasExternasActivas = async () => {
    const tareasExternas = await DB.tareasExternasActivas()
    return ({status: "OK", data: tareasExternas})
}

const porAtenderseHoy = async (idSucursal) => {
    const tareasExternas = await DB.porAtenderseHoy(idSucursal)
    return ({status: "OK", data: tareasExternas})
}

const tareaExterna = async (idTareaExterna) => {
    const tareaExterna = await DB.tareaExterna(idTareaExterna)
    return ({status: "OK", data: tareaExterna})
}

const creaTareaExterna = async (tareaExterna) => {
    const nuevaTarea = await DB.creaTareaExterna(tareaExterna)
    return ({status: "OK", data: tareaExterna})
}

const borraTareaExterna = async (idTareaExterna) => {
    const tareaExterna = await DB.borraTareaExterna(idTareaExterna)
    return ({status: "OK", data: idTareaExterna})
}

const actualizaEstadoTareaExterna = async (idTareaExterna, idUsuario, idEstadoTareaExterna) => {
    const tareaExterna = await DB.actualizaEstadoTareaExterna(idTareaExterna, idUsuario, idEstadoTareaExterna)
    return ({status: "OK", data: tareaExterna})
}

const redireccionaTareaExterna = async (idTareaExterna, idUsuario, idSucursalRedireccion, idEstadoTareaExterna) => {
    const tareaExterna = await DB.redireccionaTareaExterna(idTareaExterna, idUsuario, idEstadoTareaExterna, idSucursalRedireccion)
    return ({status: "OK", data: tareaExterna})
}

const recolectaRedireccionTareaExterna = async (idTareaExterna, idUsuario, idSucursalRedireccion, idEstadoTareaExterna) => {
    const tareaExterna = await DB.recolectaRedireccionTareaExterna(idTareaExterna, idUsuario, idEstadoTareaExterna, idSucursalRedireccion)
    return ({status: "OK", data: tareaExterna})
}

export default {
    tareasExternas,
    tareasExternasActivas,
    porAtenderseHoy,
    tareaExterna,
    creaTareaExterna,
    borraTareaExterna,
    actualizaEstadoTareaExterna,
    redireccionaTareaExterna,
    recolectaRedireccionTareaExterna
}
