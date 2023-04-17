import DB from '../databases/catalogos.js'

const estadosServicioDomicilio = async () => {
    return await DB.estadosServicioDomicilioActivos()
}

const estadosTareaExterna = async () => {
    return await DB.estadosTareaExterna()
}

const formasPago = async () => {
    return await DB.formasPago()
}

const roles = async () => {
    return await DB.roles()
}

const sucursales = async () => {
    return await DB.sucursales()
}


const tiposServicio = async () => {
    return await DB.tiposServicio()
}

const tiposTrabajo = async () => {
    return await DB.tiposTrabajo()
}

export default {
    estadosServicioDomicilio,
    estadosTareaExterna,
    formasPago,
    roles,
    sucursales,
    tiposServicio,
    tiposTrabajo,
}

