import DB from '../databases/serviciosDomicilio.js'

const serviciosDomicilio = async () => {
    return await DB.serviciosDomicilio()
}

const serviciosDomicilioActivos = async () => {
    return await DB.serviciosDomicilioActivos()
}

const serviciosDomicilioPorPagar = async () => {
    return await DB.serviciosDomicilioPorPagar()
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

const actualizaInformacionGeneral = async (idServicioDomicilio, nombre, direccion, colonia, municipio, cp, ubicacion, telefono, idUsuario) => {
    try {
        return await DB.actualizaInformacionGeneral(idServicioDomicilio, nombre, direccion, colonia, municipio, cp, ubicacion, telefono, idUsuario)
    } catch (error) {
        throw error
    }
}

const cancelaServicioDomicilio = async (idServicioDomicilio, notaCancelacion, idEstadoServicioDomicilio, idUsuario) => {
    try {
        return await DB.cancelaServicioDomicilio(idServicioDomicilio, notaCancelacion, idEstadoServicioDomicilio, idUsuario)
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
    serviciosDomicilioActivos,
    serviciosDomicilioPorPagar,
    servicioDomicilio,
    creaRecoleccion,
    creaEntrega,
    actualizaEstado,
    actualizaInfoPago,
    actualizaFechaRequerida,
    actualizaInformacionGeneral,
    borraServicioDomicilio,
    cancelaServicioDomicilio
}

