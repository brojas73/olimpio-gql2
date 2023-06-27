import DB from '../databases/catalogos.js'

const estadosServicioDomicilio = async () => {
    try {
        return await DB.estadosServicioDomicilio()
    } catch (error) {
        throw error
    }
}

const estadosTareaExterna = async () => {
    try {
        return await DB.estadosTareaExterna()
    } catch (error) {
        throw error
    }
}

const estadosTareaLocal = async () => {
    try {
        return await DB.estadosTareaLocal()
    } catch (error) {
        throw error
    }
}

const formasPago = async () => {
    try {
        return await DB.formasPago()
    } catch (error) {
        throw error
    }
}

const roles = async () => {
    try {
        return await DB.roles()
    } catch (error) {
        throw error
    }
}

const sucursales = async () => {
    try {
        return await DB.sucursales()
    } catch (error) {
        throw error
    }
}


const tiposServicio = async () => {
    try {
        return await DB.tiposServicio()
    } catch (error) {
        throw error
    }
}

const tiposTrabajo = async () => {
    try {
        return await DB.tiposTrabajo()
    } catch (error) {
        throw error
    }
}

export default {
    estadosServicioDomicilio,
    estadosTareaExterna,
    estadosTareaLocal,
    formasPago,
    roles,
    sucursales,
    tiposServicio,
    tiposTrabajo,
}

