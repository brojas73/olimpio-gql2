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
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

