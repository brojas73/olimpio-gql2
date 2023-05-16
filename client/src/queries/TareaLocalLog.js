import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_LOCALES_LOG = 'tareasLocalesLog'
export async function fetchTareasLocalesLog() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-locales-log`)
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREAS_LOCALES_LOG_BY_TAREA_LOCAL = 'tareasLocalesLogByTareaLocal'
export async function fetchTareasLocalesLogByTareaLocal({queryKey}) {
    const idTareaLocal = queryKey[1]
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-locales-log/${idTareaLocal}`)
        return data
    } catch (error) {
        throw error
    }
}
