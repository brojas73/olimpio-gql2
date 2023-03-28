import { gql } from '@apollo/client'

export const GET_TIPOS_SERVICIO = gql`
    query TiposServicio {
        tiposServicio  {
            id_tipo_servicio
            nombre
        }
    }
`
