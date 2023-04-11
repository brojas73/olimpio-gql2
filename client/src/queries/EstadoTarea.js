import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_TAREA = 'estadosTarea'
export async function fetchEstadosTarea() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/catalogos/estados-tarea-externa`)
        return data
    } catch (error) {
        throw error
    }
}

