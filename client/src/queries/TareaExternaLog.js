import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_EXTERNAS_LOG = 'tareasExternasLog'
export async function fetchTareasExternasLog() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-externas-log`)
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREAS_EXTERNAS_LOG_BY_TAREA_EXTERNA = 'tareasExternasLogByTareaExterna'
export async function fetchTareasExternasLogByTareaExterna({queryKey}) {
    const idTareaExterna = queryKey[1]
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-externas-log/${idTareaExterna}`)
        return data
    } catch (error) {
        throw error
    }
}
