import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_SERVICIOS_DOMICILIO_ACTIVOS = 'serviciosDomicilioActivos'
export async function fetchServiciosDomicilioActivos() {
    try {
        const response = await fetchData(`${getUrlApis()}/servicios-domicilio`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export const QUERY_SERVICIO_DOMICILIO = 'servicioDomicilio'
export async function fetchServicioDomicilio({queryKey}) {
    const idServicioDomicilio = queryKey[1]
    try {
        const response = await fetchData(`${getUrlApis()}/servicios-domicilio/${idServicioDomicilio}`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export const QUERY_SERVICIOS_DOMICILIO_POR_PAGAR = 'servicioSDomicilioPorPagar'
export async function fetchServiciosDomicilioPorPagar() {
    try {
        const response = await fetchData(`${getUrlApis()}/servicios-domicilio/por-pagar`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

