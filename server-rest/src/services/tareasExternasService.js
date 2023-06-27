import DB from '../databases/tareasExternas.js'

const tareasExternas = async () => {
    try {
        return await DB.tareasExternas()
    } catch (error) {
        throw error
    }
}

const tareasExternasActivas = async () => {
    try {
        return await DB.tareasExternasActivas()
    } catch (error) {
        throw error
    }
}

const porAtenderseHoy = async (idSucursal) => {
    try {
        return await DB.porAtenderseHoy(idSucursal) 
    } catch (error) {
        throw error
    }
}

const tareaExterna = async (idTareaExterna) => {
    try {
        return await DB.tareaExterna(idTareaExterna)
    } catch (error) {
        throw error
    }
}

const creaTareaExterna = async (tareaExterna) => {
    try {
        return await DB.creaTareaExterna(tareaExterna)
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
        return await DB.recolectaRedireccionTareaExterna(idTareaExterna, idUsuario, idEstadoTareaExterna, idSucursalRedireccion)
    } catch (error) {
        throw error
    }
}

const cancelaRedireccionTareaLocal = async (idTareaExterna, idTareaLocal, idUsuario, idEstadoTarea) => {
    try {
        return await DB.cancelaRedireccionTareaLocal(idTareaExterna, idTareaLocal, idUsuario, idEstadoTarea)
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
