import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_LOCALES_ACTIVAS = 'tareasLocalesActivas'
export async function fetchTareasLocalesActivas() {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-locales`)

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

export const QUERY_TAREAS_LOCALES_POR_ATENDERSE_HOY = 'tareasLocalesPorAtenderseHoy'
export async function fetchTareasLocalesPorAtenderseHoy({queryKey}) {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-locales/por-atenderse-hoy/${queryKey[1]}`)

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

export const QUERY_TAREA_LOCAL = 'tareaLocal'
export async function fetchTareaLocal({queryKey}) {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-locales/${queryKey[1]}`)

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
