import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_FORMAS_PAGO = 'formasPago'
export async function fetchFormasPago() {
    try {
        return await fetchData(`${getUrlApis()}/formas-pago`)
    } catch (error) {
        throw error
    }
}

