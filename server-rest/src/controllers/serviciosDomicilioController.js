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
    const { tipo_servicio } = req.body
    let servicioDomicilioCreado

    // Si es una recolección
    if (tipo_servicio === 'R') 
        servicioDomicilioCreado = await serviciosDomicilioService.creaRecoleccion(req.body)
    // Es una entrega
    else
        servicioDomicilioCreado = await serviciosDomicilioService.creaEntrega(req.body)

    res.send(servicioDomicilioCreado)
}

const actualizaServicioDomicilio = async (req, res) => {
    const { idServicioDomicilio } = req.params
    const { id_estado_servicio_domicilio, id_usuario, infoPago } = req.body
    let servicioDomicilioActualizado

    if (!infoPago)
        servicioDomicilioActualizado = await serviciosDomicilioService.actualizaEstadoServicioDomicilio(idServicioDomicilio, id_usuario, id_estado_servicio_domicilio)
    else {
        const { id_forma_pago, notas_pago, confirmar_pago, referencia_pago } = infoPago
        const pagado = confirmar_pago ? 'Y' : 'N' 
        servicioDomicilioActualizado = await serviciosDomicilioService.actualizaInfoPagoServicioDomicilio(idServicioDomicilio, id_forma_pago, notas_pago, pagado, referencia_pago, id_usuario)
    }

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
    actualizaServicioDomicilio,
    borraServicioDomicilio
}
