import { fetchData, getUrlApis } from '../components/comun/utils'

export const QUERY_TIPOS_TRABAJO = 'tiposTrabajo'
export async function fetchTiposTrabajo() {
    try {
        const { data } = await fetchData(`${getUrlApis()}/catalogos/tipos-trabajo`)
        return data
    } catch (error) {
        throw error
    }
}
