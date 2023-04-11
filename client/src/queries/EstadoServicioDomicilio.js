import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_SERVICIO_DOMICILIO = 'estadosServicioDomicilio'
export async function fetchEstadosServiciosDomicilio() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/catalogos/estados-servicio-domicilio`)
        return data
    } catch (error) {
        throw error
    }
}

