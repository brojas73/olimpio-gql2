import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_FORMAS_PAGO = 'formasPago'
export async function fetchFormasPago() {
    try {
        const response = await fetchData(`${getUrlApis()}/catalogos/formas-pago`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}

