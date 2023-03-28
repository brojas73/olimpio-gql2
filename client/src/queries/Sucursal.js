import { gql } from '@apollo/client'

export const GET_SUCURSALES = gql`
    query Sucursales {
        sucursales  {
            id_sucursal
            nombre
        }
    }
`
