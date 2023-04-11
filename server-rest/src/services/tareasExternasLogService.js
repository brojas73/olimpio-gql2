import DB from '../databases/tareasExternasLog.js'

const tareasExternasLog = async (ticket, descripcion) => {
    const tareasExternasLog = await DB.tareasExternasLog(ticket, descripcion)
    return ({status: "OK", data: tareasExternasLog})
}

const tareasExternasLogByTareaExterna = async (idTareaExterna) => {
    const tareasExternasLog = await DB.tareasExternasLogByTareaExterna(idTareaExterna)
    return ({status: "OK", data: tareasExternasLog})
}

export default {
    tareasExternasLog,
    tareasExternasLogByTareaExterna
}
