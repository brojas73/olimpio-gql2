import { fetchData, getUrlApis } from '../components/comun/utils.js'

export const QUERY_SUCURSALES = 'sucursales'
export async function fetchSucursales() {
    try {
        return await fetchData(`${getUrlApis()}/sucursales`)
    } catch (error) {
        throw error
    }
}

