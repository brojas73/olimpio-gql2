import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TAREAS_EXTERNAS_ACTIVAS = 'tareasExternasActivas'
export async function fetchTareasExternasActivas() {
    try {
        return await fetchData(`${getUrlApis()}/tareas-externas-activas`)
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREAS_POR_ATENDERSE_HOY = 'tareasPorAtenderseHoy'
export async function fetchTareasPorAtenderseHoy(idSucursal) {
    try {
        return await fetchData(`${getUrlApis()}/tareas-por-atenderse-hoy/${idSucursal}`)
    } catch (error) {
        throw error
    }
}

export const QUERY_TAREA_EXTERNA = 'tareaExterna'
export async function fetchTareaExterna(idTareaExterna) {
    try {
        return await fetchData(`${getUrlApis()}/tareas-externas/${idTareaExterna}`)
    } catch (error) {
        throw error
    }
}

