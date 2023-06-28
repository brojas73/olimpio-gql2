import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TIPOS_SERVICIO = 'tiposServicio'
export async function fetchTiposServicio() {
    try {
        const response = await fetchData(`${getUrlApis()}/catalogos/tipos-servicio`)

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

