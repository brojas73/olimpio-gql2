import DB from '../databases/tareasLocales.js'

const tareasLocales = async () => {
    return await DB.tareasLocales()
}

const tareasLocalesActivas = async () => {
    return await DB.tareasLocalesActivas()
}

const porAtenderseHoy = async (idSucursal) => {
    return await DB.porAtenderseHoy(idSucursal)
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
