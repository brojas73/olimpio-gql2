// import { gql } from '@apollo/client'
import { fetchData, getUrlApis } from '../components/comun/utils.js'

// export const GET_SUCURSALES = gql`
//     query Sucursales {
//         sucursales  {
//             id_sucursal
//             nombre
//         }
//     }
// `

export async function fetchSucursales() {
    try {
        return await fetchData(`${getUrlApis()}/sucursales`)
    } catch (error) {
        throw error
    }
}

