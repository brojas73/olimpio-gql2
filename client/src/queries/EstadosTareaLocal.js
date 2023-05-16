import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_TAREA_LOCAL = 'estadosTareaLocal'
export async function fetchEstadosTareaLocal() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/catalogos/estados-tarea-local`)
        return data
    } catch (error) {
        throw error
    }
}

