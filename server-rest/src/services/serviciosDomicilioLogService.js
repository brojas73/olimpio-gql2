import DB from '../databases/serviciosDomicilioLog.js'

const serviciosDomicilioLogByServicioDomicilio = async (idServicioDomicilio) => {
    return await DB.serviciosDomicilioLogByServicioDomicilio(idServicioDomicilio)
}

export default {
    serviciosDomicilioLogByServicioDomicilio
}
