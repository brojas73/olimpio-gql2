import tareasExternasLogService from "../services/tareasExternasLogService.js"

const tareasExternasLog = async (req, res) => {
    let { ticket, descripcion } = req.query

    // Si no recibimos el ticket
    if (!ticket) ticket = '%'
    if (!descripcion) descripcion = '%'

    const tareasExternasLog = await tareasExternasLogService.tareasExternasLog(ticket, descripcion)
    res.send(tareasExternasLog)
}

const tareasExternasLogByTareaExterna = async (req, res) => {
    const { idTareaExterna } = req.params 
    const tareasExternasLog = await tareasExternasLogService.tareasExternasLogByTareaExterna(idTareaExterna)
    res.send(tareasExternasLog)
}

export default {
    tareasExternasLog,
    tareasExternasLogByTareaExterna
}
