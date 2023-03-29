import { gql } from '@apollo/client'
import { fetchData, getUrlApis } from '../components/comun/utils'

export const GET_TIPOS_SERVICIO = gql`
    query TiposServicio {
        tiposServicio  {
            id_tipo_servicio
            nombre
        }
    }
`
export async function fetchTiposServicio() {
    try {
        return await fetchData(`${getUrlApis()}/tipos-servicio`)
    } catch (error) {
        throw error
    }
}

