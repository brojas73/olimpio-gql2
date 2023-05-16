import DB from '../databases/tareasLocalesLog.js'

const tareasLocalesLog = async (ticket, descripcion) => {
    return await DB.tareasLocalesLog(ticket, descripcion)
}

const tareasLocalesLogByTareaLocal = async (idTareaLocal) => {
    return await DB.tareasLocalesLogByTareaLocal(idTareaLocal)
}

export default {
    tareasLocalesLog,
    tareasLocalesLogByTareaLocal
}
