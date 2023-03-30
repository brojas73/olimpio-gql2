import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TIPOS_SERVICIO = 'tiposServicio'
export async function fetchTiposServicio() {
    try {
        return await fetchData(`${getUrlApis()}/tipos-servicio`)
    } catch (error) {
        throw error
    }
}

