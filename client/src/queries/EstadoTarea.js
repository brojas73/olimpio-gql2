// import { gql } from '@apollo/client'
import { fetchData, getUrlApis } from '../components/comun/utils'

// export const GET_ESTADOS_TAREA = gql`
//     query EstadosTarea {
//         estadosTarea {
//             id_estado_tarea
//             nombre
//             url
//         }
//     }
// `

export async function fetchEstadosTarea() {
    try {
        return await fetchData(`${getUrlApis()}/estados-tarea`)
    } catch (error) {
        throw error
    }
}

