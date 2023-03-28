import { gql } from '@apollo/client'

export const GET_ESTADOS_TAREA = gql`
    query EstadosTarea {
        estadosTarea {
            id_estado_tarea
            nombre
            url
        }
    }
`
