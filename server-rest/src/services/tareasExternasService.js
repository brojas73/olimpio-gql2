import DB from '../databases/tareasExternas.js'

const tareasExternas = async () => {
    return await DB.tareasExternas()
}

const tareasExternasActivas = async () => {
    return await DB.tareasExternasActivas()
}

const porAtenderseHoy = async (idSucursal) => {
    return await DB.porAtenderseHoy(idSucursal)
}

const tareaExterna = async (idTareaExterna) => {
    return await DB.tareaExterna(idTareaExterna)
}

const creaTareaExterna = async (tareaExterna) => {
    try {
        tareaExterna = await DB.creaTareaExterna(tareaExterna)
        return tareaExterna
    } catch (error) {
        throw error
    }
}

const borraTareaExterna = async (idTareaExterna) => {
    try {
        return await DB.borraTareaExterna(idTareaExterna)
    } catch (error) {
        throw error
    }
}

const actualizaEstadoTareaExterna = async (idTareaExterna, idUsuario, idEstadoTareaExterna) => {
    try {
        return await DB.actualizaEstadoTareaExterna(idTareaExterna, idUsuario, idEstadoTareaExterna)
    } catch (error) {
        throw error
    }
}

const redireccionaTareaExterna = async (idTareaExterna, idUsuario, idSucursalRedireccion, idEstadoTareaExterna) => {
    try {
        return await DB.redireccionaTareaExterna(idTareaExterna, idUsuario, idEstadoTareaExterna, idSucursalRedireccion)
    } catch (error) {
        throw error
    }
}

const recolectaRedireccionTareaExterna = async (idTareaExterna, idUsuario, idSucursalRedireccion, idEstadoTareaExterna) => {
    try {
        return DB.recolectaRedireccionTareaExterna(idTareaExterna, idUsuario, idEstadoTareaExterna, idSucursalRedireccion)
    } catch (error) {
        throw error
    }
}

const cancelaRedireccionTareaLocal = async (idTareaExterna, idTareaLocal, idUsuario, idEstadoTarea) => {
    try {
        return DB.cancelaRedireccionTareaLocal(idTareaExterna, idTareaLocal, idUsuario, idEstadoTarea)
    } catch (error) {
        throw error
    }
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
    recolectaRedireccionTareaExterna,
    cancelaRedireccionTareaLocal
}
