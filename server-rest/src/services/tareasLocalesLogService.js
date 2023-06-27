import DB from '../databases/tareasLocalesLog.js'

const tareasLocalesLog = async (ticket, descripcion) => {
    try {
        return await DB.tareasLocalesLog(ticket, descripcion)
    } catch (error) {
        throw error
    }
}

const tareasLocalesLogByTareaLocal = async (idTareaLocal) => {
    try {
        return await DB.tareasLocalesLogByTareaLocal(idTareaLocal)
    } catch (error) {
        throw error
    }
}

export default {
    tareasLocalesLog,
    tareasLocalesLogByTareaLocal
}
