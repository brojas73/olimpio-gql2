import usuariosService from '../services/usuariosService.js'

const login = async (req, res) => {
    const { usuario, contrasena } = req.body

    const login = await usuariosService.login(usuario, contrasena)
    res.send({status: "OK", data: login})
}

export default {
    login
}
