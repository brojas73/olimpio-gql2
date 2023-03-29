import { gql } from '@apollo/client'
import { getUrlApis } from '../components/comun/utils'

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

export async function login(credenciales) {
    try {
        const response = await fetch(`${getUrlApis()}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credenciales)
        })
        const data = await response.json()

        if (data.length > 0) {
            const { id_usuario, nombre, id_rol } = data[0]
            const userInfo = { id_usuario: id_usuario, nombre: nombre, id_rol: id_rol} 
            return userInfo
        } 
    } catch (err) {
        console.log(err)
    }
}





