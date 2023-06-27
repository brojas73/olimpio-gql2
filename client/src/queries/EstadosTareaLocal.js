import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_TAREA_LOCAL = 'estadosTareaLocal'
export async function fetchEstadosTareaLocal() {
    try {
        const response = await fetchData(`${getUrlApis()}/catalogos/estados-tarea-local`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}

