import DB from '../databases/tareasExternasLog.js'

const tareasExternasLog = async (ticket, descripcion) => {
    return await DB.tareasExternasLog(ticket, descripcion)
}

const tareasExternasLogByTareaExterna = async (idTareaExterna) => {
    return await DB.tareasExternasLogByTareaExterna(idTareaExterna)
}

export default {
    tareasExternasLog,
    tareasExternasLogByTareaExterna
}
