import { getUrlApis } from '../components/comun/utils'

export async function creaServicioDomicilio(servicioDomicilio) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(servicioDomicilio)
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export async function actualizaEstadoServicioDomicilio({id_servicio_domicilio, id_estado_servicio_domicilio, id_usuario}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_servicio_domicilio, id_usuario, id_estado_servicio_domicilio })
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export async function actualizaInfoPagoServicioDomicilio({id_servicio_domicilio, id_usuario, infoPago}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id_servicio_domicilio, id_usuario, infoPago})
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export async function borraServicioDomicilio({id_servicio_domicilio}) {
    try {
        const response = await fetch(`${getUrlApis()}/servicios-domicilio/${id_servicio_domicilio}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_servicio_domicilio })
        })

        if (!response.ok) {
            const mensaje = `Ocurrió un error: ${response.status}`
            throw new Error(mensaje)
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.log(err)
    }
}



