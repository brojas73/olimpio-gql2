export default function isConnected() {
    return (req, res, next) => {
        // Si el usuario no está conectado
        if (!req.session.usuario) {
            res
                .status(401)
                .send({
                    status: "NO AUTORIZADO",
                    data: {
                        error: 'El usuario no está conectado'
                    }
                })

            return
        }

        // El usuario está conectado, la respuesta la brindará la página siguiente
        next()
    }
}

