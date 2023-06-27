import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_SERVICIOS_DOMICILIO_LOG = 'serviciosDomicilioLog'
export async function fetchServiciosDomicilioLog() {
    try {
        const response = await fetchData(`${getUrlApis()}/servicios-domicilio-log`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_SERVICIOS_DOMICILIO_LOG_BY_SERVICIO_DOMICILIO = 'serviciosDomicilioLogByServicioDomicilio'
export async function fetchServiciosDomicilioLogByServicioDomicilio({queryKey}) {
    const idServicioDomicilio = queryKey[1]
    try {
        const response = await fetchData(`${getUrlApis()}/servicios-domicilio-log/${idServicioDomicilio}`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}
