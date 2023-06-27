import { fetchData, getUrlApis } from '../components/comun/utils.js'

export const QUERY_SUCURSALES = 'sucursales'
export async function fetchSucursales() {
    try {
        const response = await fetchData(`${getUrlApis()}/catalogos/sucursales`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}

