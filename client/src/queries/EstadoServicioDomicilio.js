import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_SERVICIO_DOMICILIO = 'estadosServicioDomicilio'
export async function fetchEstadosServiciosDomicilio() {
    try {
        const response = await fetchData(`${getUrlApis()}/catalogos/estados-servicio-domicilio`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}

