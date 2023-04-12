import serviciosDomicilioService from '../services/serviciosDomicilioService.js'

const serviciosDomicilio = async (_, res) => {
    const serviciosDomicilio = await serviciosDomicilioService.serviciosDomicilio()
    res.send({status: "OK", data: serviciosDomicilio})
}

const servicioDomicilio = async (req, res) => {
    const {
        params: { idServicioDomicilio }
    } = req

    if (!idServicioDomicilio) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { 
                    error: 'No se recibió el parámetro idServicioDomicilio'
                }

            })
        return
    }

    const servicioDomicilio = await serviciosDomicilioService.servicioDomicilio(idServicioDomicilio)
    res.send({status: "OK", data: servicioDomicilio})
}

const creaServicioDomicilio = async (req, res) => {
    const {
        body
    } = req
    let servicioDomicilioCreado

    if (
        !body.tipo_servicio ||
        !body.fecha_requerida ||
        !body.hora_requerida ||
        !body.nombre ||
        !body.direccion ||
        !body.telefono
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: `
                        Alguno de los campos faltó o está vacío en el cuerpo de la petición: 
                        'tipo_servicio', 'fecha_requerida', 'hora_requerida', 'nombre', 'direccion', 'telefono'
                    `
                }
            })
            
        return
    }

    // Si es una entrega, requerimos la información de pago
    if (
        body.tipo_servicio === 'E' &&
        !body.id_forma_pago
    ) {
        res
            .status(401)
            .send({
                status: "FAILED",
                data: {
                    error: `
                        Para las entregas se requiere que se capture la 'id_forma_pago'
                    `
                }
            })
            
        return

    }

    try {
        // Si es una recolección
        if (body.tipo_servicio === 'R') 
            servicioDomicilioCreado = await serviciosDomicilioService.creaRecoleccion(body)
        // Es una entrega
        else
            servicioDomicilioCreado = await serviciosDomicilioService.creaEntrega(body)

        res.status(201).send({status: "OK", data: servicioDomicilioCreado})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const actualizaServicioDomicilio = async (req, res) => {
    const { 
        params: {idServicioDomicilio},
        body:   {id_estado_servicio_domicilio, id_usuario, infoPago}
    } = req
    let servicioDomicilioActualizado

    if (!idServicioDomicilio) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 'No se recibió el parámetro idServicioDomicilio'
                }
            })
        return
    }

    try {
        // Si se está actualizando el estado del servicio
        if (!infoPago)
            servicioDomicilioActualizado = await serviciosDomicilioService.actualizaEstadoServicioDomicilio(idServicioDomicilio, id_usuario, id_estado_servicio_domicilio)
        // Se está actualizando la información de pago
        else {
            const { id_forma_pago, notas_pago, confirmar_pago, referencia_pago } = infoPago
            const pagado = confirmar_pago ? 'Y' : 'N' 
            servicioDomicilioActualizado = await serviciosDomicilioService.actualizaInfoPagoServicioDomicilio(idServicioDomicilio, id_forma_pago, notas_pago, pagado, referencia_pago, id_usuario)
        }

        res.send({status: "OK", data: servicioDomicilioActualizado})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const borraServicioDomicilio = async (req, res) => {
    const { 
        params: {idServicioDomicilio} 
    } = req

    if (!idServicioDomicilio) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 'No se recibió el parámetro idServicioDomicilio'
                }
            })
        return
    }

    try {
        const servicioDomicilioBorrado = await serviciosDomicilioService.borraServicioDomicilio(idServicioDomicilio)
        res.status(204).send({status: "OK", data: servicioDomicilioBorrado})
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

export default {
    serviciosDomicilio,
    servicioDomicilio,
    creaServicioDomicilio,
    actualizaServicioDomicilio,
    borraServicioDomicilio
}
