import { fetchData, getUrlApis } from '../components/comun/utils'


export const QUERY_ESTADOS_TAREA = 'estadosTarea'
export async function fetchEstadosTarea() {
    try {
        return await fetchData(`${getUrlApis()}/estados-tarea`)
    } catch (error) {
        throw error
    }
}

