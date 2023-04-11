import DB from '../databases/usuarios.js'

const login = async (usuario, contrasena) => {
    return await DB.login(usuario, contrasena)
}

export default {
    login
}

