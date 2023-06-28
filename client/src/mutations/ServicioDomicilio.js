import { getUrlApis } from '../components/comun/utils'
import { STATUS_SERVICIO_DOMICILIO } from '../context/ServiciosDomicilioContext'

export async function creaServicioDomicilio(servicioDomicilio) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(servicioDomicilio)
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function actualizaEstado({id_servicio_domicilio, id_estado_servicio_domicilio, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_servicio_domicilio, id_usuario, id_estado_servicio_domicilio })
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function actualizaInfoPago({id_servicio_domicilio, id_usuario, infoPago}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id_servicio_domicilio, id_usuario, infoPago, tipoAccion: 'actualiza-informacion-pago'})
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function actualizaFechaRequerida({id_servicio_domicilio, id_usuario, fechaRequerida}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id_servicio_domicilio, id_usuario, fechaRequerida, tipoAccion: 'actualiza-fecha-requerida'})
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function actualizaInformacionGeneral({id_servicio_domicilio, id_usuario, informacionGeneral}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id_servicio_domicilio, id_usuario, informacionGeneral, tipoAccion: 'actualiza-informacion-general'})
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function cancelaServicioDomicilio({id_servicio_domicilio, id_usuario, informacionCancelacion}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_servicio_domicilio, 
                id_usuario, 
                id_estado_servicio_domicilio: STATUS_SERVICIO_DOMICILIO.CANCELADO, 
                informacionCancelacion, 
                tipoAccion: 'cancelacion'
            })
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const data = await response.json()
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export async function borraServicioDomicilio({id_servicio_domicilio}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_servicio_domicilio })
        })

        if (!response.ok) {
            const { data } = await response.json()
            throw new Error(data.error)
        }

        const json = await response.json()
        const { data } = json
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

