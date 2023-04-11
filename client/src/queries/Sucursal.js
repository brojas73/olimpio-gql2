import { fetchData, getUrlApis } from '../components/comun/utils.js'

export const QUERY_SUCURSALES = 'sucursales'
export async function fetchSucursales() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/catalogos/sucursales`)
        return data
    } catch (error) {
        throw error
    }
}

