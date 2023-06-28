import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_LOCALES_LOG = 'tareasLocalesLog'
export async function fetchTareasLocalesLog() {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-locales-log`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}

export const QUERY_TAREAS_LOCALES_LOG_BY_TAREA_LOCAL = 'tareasLocalesLogByTareaLocal'
export async function fetchTareasLocalesLogByTareaLocal({queryKey}) {
    const idTareaLocal = queryKey[1]
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-locales-log/${idTareaLocal}`)

        if (response.status === 'FAILED') {
            throw new Error(response.data.error)
        }

        const { data } = response
        return data
    } catch (err) {
        // eslint-disable-next-line eqeqeq
        if (err == 'TypeError: Failed to fetch')
            throw new Error('No puedo contactar al servidor')
        else
            throw new Error(err)
    }
}
