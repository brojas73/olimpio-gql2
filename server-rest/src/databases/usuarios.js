import pool from './pool.js'

const login = (usuario, contrasena) => {
    const q = `
       select   id_usuario,
                usuario,
                nombre,
                email,
                id_rol
          from  usuario 
          where usuario = ? 
          and   contrasena = ? 
          and   estado = 1
    `

    return new Promise((resolve, reject) => {
        pool.query(q, [usuario, contrasena], (err, data) => {
            if (err) {
                console.log(err)
                return reject({
                    status: 500,
                    message: err?.message || err
                })
            }

            if (data) {
                return resolve(JSON.parse(JSON.stringify(data)))
            } else {
                return resolve({ 
                    status: 'ERROR',
                    mensaje: 'Combinación de usuario/contraseña no encontrada'
                })
            }
        })
    })
}

export default {
    login
}