import tareasExternasLogService from "../services/tareasExternasLogService.js"

const tareasExternasLog = async (req, res) => {
    let { 
        query: { ticket, descripcion } 
    } = req

    // Si no recibimos el ticket
    if (!ticket) ticket = '%'
    if (!descripcion) descripcion = '%'

    try {
        const tareasExternasLog = await tareasExternasLogService.tareasExternasLog(ticket, descripcion)
        res.send({status: "OK", data: tareasExternasLog})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const tareasExternasLogByTareaExterna = async (req, res) => {
    const { 
        params: { idTareaExterna }
    } = req

    if (!idTareaExterna) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { 
                    error: 'No se recibió el parámetro idTareaExterna'
                }

            })
        return
    }

    try {
        const tareasExternasLog = await tareasExternasLogService.tareasExternasLogByTareaExterna(idTareaExterna)
        res.send({status: "OK", data: tareasExternasLog})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

export default {
    tareasExternasLog,
    tareasExternasLogByTareaExterna
}
