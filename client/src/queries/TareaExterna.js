import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_EXTERNAS_ACTIVAS = 'tareasExternasActivas'
export async function fetchTareasExternasActivas() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-externas`)
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREAS_POR_ATENDERSE_HOY = 'tareasPorAtenderseHoy'
export async function fetchTareasPorAtenderseHoy({queryKey}) {
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-externas/por-atenderse-hoy/${queryKey[1]}`)
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREA_EXTERNA = 'tareaExterna'
export async function fetchTareaExterna({queryKey}) {
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-externas/${queryKey[1]}`)
        return data
    } catch (error) {
        throw error
    }
}

