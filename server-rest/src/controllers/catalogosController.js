import catalogosService from '../services/catalogosService.js'

const estadosServicioDomicilio = async (_, res) => {
    try {
        const estadosServicioDomicilio = await catalogosService.estadosServicioDomicilio()
        res.send({status: "OK", data: estadosServicioDomicilio})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const estadosTareaExterna = async (_, res) => {
    try {
        const estadosTareaExterna = await catalogosService.estadosTareaExterna()
        res.send({status: "OK", data: estadosTareaExterna})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const estadosTareaLocal = async (_, res) => {
    try {
        const estadosTareaLocal = await catalogosService.estadosTareaLocal()
        res.send({status: "OK", data: estadosTareaLocal})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const formasPago = async (_, res) => {
    try {
        const formasPago = await catalogosService.formasPago()
        res.send({status: "OK", data: formasPago})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const roles = async (_, res) => {
    try {
        const roles = await catalogosService.roles()
        res.send({status: "OK", data: roles})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const sucursales = async (_, res) => {
    try {
        const sucursales = await catalogosService.sucursales()
        res.send({status: "OK", data: sucursales})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const tiposServicio = async (_, res) => {
    try {
        const tiposServicio = await catalogosService.tiposServicio()
        res.send({status: "OK", data: tiposServicio})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const tiposTrabajo = async (_, res) => {
    try {
        const tiposTrabajo = await catalogosService.tiposTrabajo()
        res.send({status: "OK", data: tiposTrabajo})
    } catch (err) {
        return res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
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
    tiposTrabajo
}

