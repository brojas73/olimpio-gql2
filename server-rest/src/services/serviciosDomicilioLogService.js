import DB from '../databases/serviciosDomicilioLog.js'

const serviciosDomicilioLogByServicioDomicilio = async (idServicioDomicilio) => {
    try {
        return await DB.serviciosDomicilioLogByServicioDomicilio(idServicioDomicilio)
    } catch (error) {
        throw error
    }
}

export default {
    serviciosDomicilioLogByServicioDomicilio
}
