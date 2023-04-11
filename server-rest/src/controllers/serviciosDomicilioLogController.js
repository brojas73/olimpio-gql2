import serviciosDomicilioLogService from "../services/serviciosDomicilioLogService.js"

const serviciosDomicilioLogByServicioDomicilio = async (req, res) => {
    const { idServicioDomicilio } = req.params 
    const serviciosDomicilioLog = await serviciosDomicilioLogService.serviciosDomicilioLogByServicioDomicilio(idServicioDomicilio)
    res.send(serviciosDomicilioLog)
}

export default {
    serviciosDomicilioLogByServicioDomicilio
}
