import tareasLocalesLogService from "../services/tareasLocalesLogService.js"

const tareasLocalesLog = async (req, res) => {
    let { 
        query: { ticket, descripcion } 
    } = req

    // Si no recibimos el ticket
    if (!ticket) ticket = '%'
    if (!descripcion) descripcion = '%'

    try {
        const tareasLocalesLog = await tareasLocalesLogService.tareasLocalesLog(ticket, descripcion)
        res.send({status: "OK", data: tareasLocalesLog})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const tareasLocalesLogByTareaLocal = async (req, res) => {
    const { 
        params: { idTareaLocal }
    } = req

    if (!idTareaLocal) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { 
                    error: 'No se recibió el parámetro idTareaLocal'
                }

            })
        return
    }

    try {
        const tareasLocalesLog = await tareasLocalesLogService.tareasLocalesLogByTareaLocal(idTareaLocal)
        res.send({status: "OK", data: tareasLocalesLog})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

export default {
    tareasLocalesLog,
    tareasLocalesLogByTareaLocal
}
