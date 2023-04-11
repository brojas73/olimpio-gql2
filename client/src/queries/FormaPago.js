import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_FORMAS_PAGO = 'formasPago'
export async function fetchFormasPago() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/catalogos/formas-pago`)
        return data
    } catch (error) {
        throw error
    }
}

