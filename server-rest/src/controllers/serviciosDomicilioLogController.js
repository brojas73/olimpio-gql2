import serviciosDomicilioLogService from "../services/serviciosDomicilioLogService.js"

const serviciosDomicilioLogByServicioDomicilio = async (req, res) => {
    const { 
        params: { idServicioDomicilio }
    } = req

    if (!idServicioDomicilio) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { 
                    error: 'No se recibió el parámetro idServicioDomicilio'
                }

            })
        return
    }

    try {
        const serviciosDomicilioLog = await serviciosDomicilioLogService.serviciosDomicilioLogByServicioDomicilio(idServicioDomicilio)
        res.send({status: "OK", data: serviciosDomicilioLog})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

export default {
    serviciosDomicilioLogByServicioDomicilio
}
