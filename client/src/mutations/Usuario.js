// import { gql } from '@apollo/client'
import { getUrlApis } from '../components/comun/utils'

export async function login(credenciales) {
    try {
        const response = await fetch(`${getUrlApis()}/usuarios/login`, {
            credentials: 'include',
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credenciales)
        })
        const { data } = await response.json()

        if (data.length > 0) {
            const { id_usuario, nombre, id_rol } = data[0]
            const userInfo = { id_usuario: id_usuario, nombre: nombre, id_rol: id_rol} 
            return userInfo
        } 
    } catch (err) {
        console.log(err)
    }
}

export async function logout() {
    try {
        await fetch(`${getUrlApis()}/usuarios/logout`, {
            credentials: 'include',
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export async function me() {
    try {
        await fetch(`${getUrlApis()}/usuarios/me`, {
            credentials: 'include',
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
}
