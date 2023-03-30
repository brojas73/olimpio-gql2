import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TIPOS_TRABAJO = 'tiposTrabajo'
export async function fetchTiposTrabajo() {
    try {
        return await fetchData(`${getUrlApis()}/tipos-trabajo`)
    } catch (error) {
        throw error
    }
}
