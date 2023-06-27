import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_TAREA = 'estadosTarea'
export async function fetchEstadosTarea() {
    try {
        const response = await fetchData(`${getUrlApis()}/catalogos/estados-tarea-externa`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}

