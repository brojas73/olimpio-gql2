import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_SERVICIOS_DOMICILIO_ACTIVOS = 'serviciosDomicilioActivos'
export async function fetchServiciosDomicilioActivos() {
    try {
        return await fetchData(`${getUrlApis()}/servicios-domicilio-activos`)
    } catch (error) {
        throw error
    }
}

export const QUERY_SERVICIO_DOMICILIO = 'servicioDomicilio'
export async function fetchServicioDomicilio(idServicioDomicilio) {
    try {
        return await fetchData(`${getUrlApis()}/servicios-domicilio/${idServicioDomicilio}`)
    } catch (error) {
        throw error
    }
}

export const QUERY_SERVICIOS_DOMICILIO_POR_PAGAR = 'servicioSDomicilioPorPagar'
export async function fetchServiciosDomicilioPorPagar(idServicioDomicilio) {
    try {
        return await fetchData(`${getUrlApis()}/servicios-domicilio-por-pagar`)
    } catch (error) {
        throw error
    }
}


