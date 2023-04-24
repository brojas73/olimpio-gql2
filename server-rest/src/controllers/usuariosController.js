import usuariosService from '../services/usuariosService.js'
import {COOKIE_NAME} from '../constants.js'

const login = async (req, res) => {
    const { 
        body: { usuario, contrasena }
    } = req

    const login = await usuariosService.login(usuario, contrasena)

    // Si nos pudimos firmar a la aplicación
    if (login.length > 0) {
        const json = JSON.parse(JSON.stringify(login))

        // Guardamos una cookie con la sesión
        req.session.usuario = json[0]
        
        return res.send({status: "OK", data: login})
    // No nos pudimos firmar a la aplicación
    } else {
        return res
            .status(401)
            .send({
                status: "FAILED", 
                data: {
                    error: {
                        mensaje: 'Combinación de usuario/contraseña inválida'
                    }
                }
            })
    }
}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            res.send(false)
            return
        }

        res.clearCookie(COOKIE_NAME)
        res.send(true)
    })
}

const me = (req, res) => {
    // Si el usuario no está firmado
    if (!req.session.usuario) {
        res
            .status(401)
            .send({
                status: "FAILED", 
                data: {
                    error: "Usuario no conectado"
                }
            })
        return
    }

    // El usuario está firmado, regreso la información del usuario
    res.send({status: "OK", data: req.session.usuario})
}

export default {
    login,
    logout,
    me
}

