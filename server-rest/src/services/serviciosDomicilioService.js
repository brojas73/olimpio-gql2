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

const actualizaEstado = async (idServicioDomicilio, idUsuario, idEstadoServicioDomicilio) => {
    try {
        return await DB.actualizaEstado(idServicioDomicilio, idUsuario, idEstadoServicioDomicilio)
    } catch (error) {
        throw error
    }
}

const actualizaInfoPago = async (idServicioDomicilio, idFormaPago, notasPago, pagado, referenciaPago, idUsuario) => {
    try {
        return await DB.actualizaInfoPago(idServicioDomicilio, idFormaPago, notasPago, pagado, referenciaPago, idUsuario)
    } catch (error) {
        throw error
    }
}

const actualizaFechaRequerida = async (idServicioDomicilio, fechaRequerida, horaRequerida, idUsuario) => {
    try {
        return await DB.actualizaFechaRequerida(idServicioDomicilio, fechaRequerida, horaRequerida, idUsuario)
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
    actualizaEstado,
    actualizaInfoPago,
    actualizaFechaRequerida,
    borraServicioDomicilio
}

