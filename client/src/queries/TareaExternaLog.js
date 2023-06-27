import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_EXTERNAS_LOG = 'tareasExternasLog'
export async function fetchTareasExternasLog() {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-externas-log`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREAS_EXTERNAS_LOG_BY_TAREA_EXTERNA = 'tareasExternasLogByTareaExterna'
export async function fetchTareasExternasLogByTareaExterna({queryKey}) {
    const idTareaExterna = queryKey[1]
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-externas-log/${idTareaExterna}`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (error) {
        throw error
    }
}
