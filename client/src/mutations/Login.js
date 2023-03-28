import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation Login($usuario: String!, $contrasena: String!) {
        login(usuario: $usuario, contrasena: $contrasena) {
            status {
                successful
                message
            }
            usuario {
                id_usuario
                usuario
                nombre
                rol {
                    id_rol
                }
            }
        }
    }
`


