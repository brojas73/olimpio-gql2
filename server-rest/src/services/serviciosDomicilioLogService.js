import DB from '../databases/serviciosDomicilioLog.js'

const serviciosDomicilioLogByServicioDomicilio = async (idServicioDomicilio) => {
    const serviciosDomicilioLog = await DB.serviciosDomicilioLogByServicioDomicilio(idServicioDomicilio)
    return ({status: "OK", data: serviciosDomicilioLog})
}

export default {
    serviciosDomicilioLogByServicioDomicilio
}
