import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TIPOS_SERVICIO = 'tiposServicio'
export async function fetchTiposServicio() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/catalogos/tipos-servicio`)
        return data
    } catch (error) {
        throw error
    }
}

