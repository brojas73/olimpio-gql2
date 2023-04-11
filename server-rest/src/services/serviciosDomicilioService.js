import DB from '../databases/serviciosDomicilio.js'

const serviciosDomicilio = async () => {
    const serviciosDomicilio = await DB.serviciosDomicilio()
    return ({status: "OK", data: serviciosDomicilio})
}

const servicioDomicilio = async (idServicioDomicilio) => {
    const servicioDomicilio = await DB.servicioDomicilio(idServicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}

const creaRecoleccion = async (servicioDomicilio) => {
    await DB.creaRecoleccion(servicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}

const creaEntrega = async (servicioDomicilio) => {
    await DB.creaEntrega(servicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}


const actualizaEstadoServicioDomicilio = async (idServicioDomicilio, idUsuario, idEstadoServicioDomicilio) => {
    const servicioDomicilio = await DB.actualizaEstadoServicioDomicilio(idServicioDomicilio, idUsuario, idEstadoServicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}

const actualizaInfoPagoServicioDomicilio = async (idServicioDomicilio, idFormaPago, notasPago, pagado, referenciaPago, idUsuario) => {
    const servicioDomicilio = await DB.actualizaInfoPagoServicioDomicilio(idServicioDomicilio, idFormaPago, notasPago, pagado, referenciaPago, idUsuario)
    return ({status: "OK", data: servicioDomicilio})
}

const borraServicioDomicilio = async (idServicioDomicilio) => {
    const servicioDomicilio = await DB.borraServicioDomicilio(idServicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
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

