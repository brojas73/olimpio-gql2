import DB from '../databases/serviciosDomicilio.js'

const serviciosDomicilio = async () => {
    return await DB.serviciosDomicilio()
}

const servicioDomicilio = async (idServicioDomicilio) => {
    return await DB.servicioDomicilio(idServicioDomicilio)
}

const creaRecoleccion = async (servicioDomicilio) => {
    try {
        return await DB.creaRecoleccion(servicioDomicilio)
    } catch (error) {
        throw error
    }
}

const creaEntrega = async (servicioDomicilio) => {
    try {
        return await DB.creaEntrega(servicioDomicilio)
    } catch (error) {
        throw error
    }
}

const actualizaEstadoServicioDomicilio = async (idServicioDomicilio, idUsuario, idEstadoServicioDomicilio) => {
    try {
        return await DB.actualizaEstadoServicioDomicilio(idServicioDomicilio, idUsuario, idEstadoServicioDomicilio)
    } catch (error) {
        throw error
    }
}

const actualizaInfoPagoServicioDomicilio = async (idServicioDomicilio, idFormaPago, notasPago, pagado, referenciaPago, idUsuario) => {
    try {
        return await DB.actualizaInfoPagoServicioDomicilio(idServicioDomicilio, idFormaPago, notasPago, pagado, referenciaPago, idUsuario)
    } catch (error) {
        throw error
    }
}

const borraServicioDomicilio = async (idServicioDomicilio) => {
    try {
        return await DB.borraServicioDomicilio(idServicioDomicilio)
    } catch (error) {
        throw error
    }
}

export default {
    serviciosDomicilio,
    servicioDomicilio,
    creaRecoleccion,
    creaEntrega,
    actualizaEstadoServicioDomicilio,
    actualizaInfoPagoServicioDomicilio,
    borraServicioDomicilio
}

