import DB from '../databases/tareasExternasLog.js'

const tareasExternasLog = async (ticket, descripcion) => {
    try {
        return await DB.tareasExternasLog(ticket, descripcion)
    } catch (error) {
        throw error
    }
}

const tareasExternasLogByTareaExterna = async (idTareaExterna) => {
    try {
        return await DB.tareasExternasLogByTareaExterna(idTareaExterna)
    } catch (error) {
        throw error
    }
}

export default {
    tareasExternasLog,
    tareasExternasLogByTareaExterna
}
