import { gql } from '@apollo/client'

export const GET_TIPOS_TRABAJO = gql`
    query TiposTrabajo {
        tiposTrabajo  {
            id_tipo_trabajo
            nombre
        }
    }
`
