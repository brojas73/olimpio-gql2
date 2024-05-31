import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_EXTERNAS_ACTIVAS = 'tareasExternasActivas'
export async function fetchTareasExternasActivas() {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-externas`)

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

export const QUERY_TAREAS_EXTERNAS_TERMINADAS = 'tareasExternasTerminadas'
export async function fetchTareasExternasTerminadas({queryKey}) {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-externas/terminadas/${queryKey[1]}`)

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

export const QUERY_TAREAS_POR_ATENDERSE_HOY = 'tareasPorAtenderseHoy'
export async function fetchTareasPorAtenderseHoy({queryKey}) {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-externas/por-atenderse-hoy/${queryKey[1]}`)

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

export const QUERY_TAREA_EXTERNA = 'tareaExterna'
export async function fetchTareaExterna({queryKey}) {
    try {
        const response = await fetchData(`${getUrlApis()}/tareas-externas/${queryKey[1]}`)

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

