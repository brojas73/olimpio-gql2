import DB from '../databases/tareasLocales.js'

const tareasLocales = async () => {
    try {
        return await DB.tareasLocales()
    } catch (error) {
        throw error
    }
}

const tareasLocalesActivas = async () => {
    try {
        return await DB.tareasLocalesActivas()
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

const tareaLocal = async (idTareaLocal) => {
    return await DB.tareaLocal(idTareaLocal)
}

const creaTareaLocal = async (tareaLocal) => {
    try {
        tareaLocal = await DB.creaTareaLocal(tareaLocal)
        return tareaLocal
    } catch (error) {
        throw error
    }
}

const borraTareaLocal = async (idTareaLocal) => {
    try {
        return await DB.borraTareaLocal(idTareaLocal)
    } catch (error) {
        throw error
    }
}

const actualizaEstadoTareaLocal = async (idTareaLocal, idUsuario, idEstadoTareaLocal) => {
    try {
        const tarea = await DB.actualizaEstadoTareaLocal(idTareaLocal, idUsuario, idEstadoTareaLocal)
        return tarea
    } catch (error) {
        throw error
    }
}

const redireccionaTareaLocal = async (idTareaLocal, idUsuario, idSucursalRedireccion, idEstadoTarea) => {
    try {
        return await DB.redireccionaTareaLocal(idTareaLocal, idUsuario, idEstadoTarea, idSucursalRedireccion)
    } catch (error) {
        throw error
    }
}

export default {
    tareasLocales,
    tareasLocalesActivas,
    porAtenderseHoy,
    tareaLocal,
    creaTareaLocal,
    borraTareaLocal,
    actualizaEstadoTareaLocal,
    redireccionaTareaLocal
}
