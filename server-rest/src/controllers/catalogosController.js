import catalogosService from '../services/catalogosService.js'

const estadosServicioDomicilio = async (req, res) => {
    const estadosServicioDomicilio = await catalogosService.estadosServicioDomicilio()
    res.send({status: "OK", data: estadosServicioDomicilio})
}

const estadosTareaExterna = async (req, res) => {
    const estadosTareaExterna = await catalogosService.estadosTareaExterna()
    res.send({status: "OK", data: estadosTareaExterna})
}

const formasPago = async (req, res) => {
    const formasPago = await catalogosService.formasPago()
    res.send({status: "OK", data: formasPago})
}

const roles = async (req, res) => {
    const roles = await catalogosService.roles()
    res.send({status: "OK", data: roles})
}

const sucursales = async (req, res) => {
    const sucursales = await catalogosService.sucursales()
    res.send({status: "OK", data: sucursales})
}

const tiposServicio = async (req, res) => {
    const tiposServicio = await catalogosService.tiposServicio()
    res.send({status: "OK", data: tiposServicio})
}

const tiposTrabajo = async (req, res) => {
    const tiposTrabajo = await catalogosService.tiposTrabajo()
    res.send({status: "OK", data: tiposTrabajo})
}

export default {
    estadosServicioDomicilio,
    estadosTareaExterna,
    formasPago,
    roles,
    sucursales,
    tiposServicio,
    tiposTrabajo
}
