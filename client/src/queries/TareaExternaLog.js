import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_EXTERNAS_LOG = 'tareasExternasLog'
export async function fetchTareasExternasLog() {
    try {
        return await fetchData(`${getUrlApis()}/tareas-externas-log`)
    } catch (error) {
        throw error
    }
}

