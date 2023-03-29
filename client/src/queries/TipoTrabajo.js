import { gql } from '@apollo/client'
import { fetchData, getUrlApis } from '../components/comun/utils'

export const GET_TIPOS_TRABAJO = gql`
    query TiposTrabajo {
        tiposTrabajo  {
            id_tipo_trabajo
            nombre
        }
    }
`

export async function fetchTiposTrabajo() {
    try {
        return await fetchData(`${getUrlApis()}/tipos-trabajo`)
    } catch (error) {
        throw error
    }
}
