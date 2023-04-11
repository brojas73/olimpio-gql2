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
export async function fetchTareasPorAtenderseHoy(idSucursal) {
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-externas/por-atenderse-hoy/${idSucursal}`)
        return data
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREA_EXTERNA = 'tareaExterna'
export async function fetchTareaExterna(idTareaExterna) {
    try {
        const { data } = await fetchData(`${getUrlApis()}/tareas-externas/${idTareaExterna}`)
        return data
    } catch (error) {
        throw error
    }
}

