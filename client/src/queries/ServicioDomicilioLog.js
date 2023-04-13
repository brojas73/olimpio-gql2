import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_SERVICIOS_DOMICILIO_LOG = 'serviciosDomicilioLog'
export async function fetchServiciosDomicilioLog() {
    try {
        return await fetchData(`${getUrlApis()}/servicios-domicilio-log`)
    } catch (error) {
        throw error
    }
}

export const QUERY_SERVICIOS_DOMICILIO_LOG_BY_SERVICIO_DOMICILIO = 'serviciosDomicilioLogByServicioDomicilio'
export async function fetchServiciosDomicilioLogByServicioDomicilio({queryKey}) {
    const idServicioDomicilio = queryKey[1]
    try {
        const { data } = await fetchData(`${getUrlApis()}/servicios-domicilio-log/${idServicioDomicilio}`)
        return data
    } catch (error) {
        throw error
    }
}
