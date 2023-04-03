import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_SERVICIO_DOMICILIO = 'estadosServicioDomicilio'
export async function fetchEstadosServiciosDomicilio() {
    try {
        return await fetchData(`${getUrlApis()}/estados-servicio-domicilio`)
    } catch (error) {
        throw error
    }
}

