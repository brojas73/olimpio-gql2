import serviciosDomicilioService from '../services/serviciosDomicilioService.js'

const serviciosDomicilio = async (_, res) => {
    const serviciosDomicilio = await serviciosDomicilioService.serviciosDomicilio()
    res.send(serviciosDomicilio)
}

const servicioDomicilio = async (req, res) => {
    const { idServicioDomicilio } = req.params 
    const servicioDomicilio = await serviciosDomicilioService.servicioDomicilio(idServicioDomicilio)
    res.send(servicioDomicilio)
}

const creaServicioDomicilio = async (req, res) => {
    const servicioDomicilioCreado = await serviciosDomicilioService.creaServicioDomicilio(req.body)
    res.send(servicioDomicilioCreado)
}

const actualizaEstadoServicioDomicilio = async (req, res) => {
    const { idServicioDomicilio } = req.params
    const { id_estado_servicio_domicilio, id_usuario } = req.body
    const servicioDomicilioActualizado = await serviciosDomicilioService.actualizaEstadoServicioDomicilio(idServicioDomicilio, id_usuario, id_estado_servicio_domicilio)
    res.send(servicioDomicilioActualizado)
}

const borraServicioDomicilio = async (req, res) => {
    const { idServicioDomicilio } = req.params
    const servicioDomicilioBorrado = await serviciosDomicilioService.borraServicioDomicilio(idServicioDomicilio)
    res.send(servicioDomicilioBorrado)
}

export default {
    serviciosDomicilio,
    servicioDomicilio,
    creaServicioDomicilio,
    actualizaEstadoServicioDomicilio,
    borraServicioDomicilio
}
