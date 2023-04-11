import DB from '../databases/serviciosDomicilio.js'

const serviciosDomicilio = async () => {
    const serviciosDomicilio = await DB.serviciosDomicilio()
    return ({status: "OK", data: serviciosDomicilio})
}

const servicioDomicilio = async (idServicioDomicilio) => {
    const servicioDomicilio = await DB.servicioDomicilio(idServicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}

const creaServicioDomicilio = async (servicioDomicilio) => {
    await DB.creaServicioDomicilio(servicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}

const actualizaEstadoServicioDomicilio = async (idServicioDomicilio, idUsuario, idEstadoServicioDomicilio) => {
    const servicioDomicilio = await DB.actualizaEstadoServicioDomicilio(idServicioDomicilio, idUsuario, idEstadoServicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}

const borraServicioDomicilio = async (idServicioDomicilio) => {
    const servicioDomicilio = await DB.borraServicioDomicilio(idServicioDomicilio)
    return ({status: "OK", data: servicioDomicilio})
}

export default {
    serviciosDomicilio,
    servicioDomicilio,
    creaServicioDomicilio,
    actualizaEstadoServicioDomicilio,
    borraServicioDomicilio
}

