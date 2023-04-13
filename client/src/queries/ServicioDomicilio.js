import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_SERVICIOS_DOMICILIO_ACTIVOS = 'serviciosDomicilioActivos'
export async function fetchServiciosDomicilioActivos() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/servicios-domicilio`)
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_SERVICIO_DOMICILIO = 'servicioDomicilio'
export async function fetchServicioDomicilio({queryKey}) {
    const idServicioDomicilio = queryKey[1]
    try {
        const { data } = await fetchData(`${getUrlApis()}/servicios-domicilio/${idServicioDomicilio}`)
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_SERVICIOS_DOMICILIO_POR_PAGAR = 'servicioSDomicilioPorPagar'
export async function fetchServiciosDomicilioPorPagar() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/servicios-domicilio-por-pagar`)
        return data
    } catch (error) {
        throw error
    }
}


