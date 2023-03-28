import { GraphQLString } from "graphql"
import { Usuario } from "../../Entities/Usuario"
import { AuthPayloadType } from "../TypeDefs/AuthPayload"

// const jwt = require('jsonwebtoken')
// const { APP_SECRET, getUserId } = require('../../utils')

export const LOGIN = {
    type: AuthPayloadType,
    args: {
        usuario: { type: GraphQLString },
        contrasena: { type: GraphQLString }        
    },
    async resolve(_, args) {
        const usuario = await Usuario.findOne({ where: { usuario: args.usuario } }) 

        if (!usuario) {
            return {
                status: {
                    successful: false,
                    message: `El usuario '${args.usuario}' no existe`
                }
            }
        }

        // Si la contraseña es incorrecta
        if (!(usuario.contrasena === args.contrasena)) {
            return {
                status: {
                    successful: false,
                    message: 'La contraseña es inválida'
                }
            }
        }

        // const token = await jwt.sign({ userId: usuario.id_usuario }, APP_SECRET)
        return {
            status: {
                successful: true
            },
            usuario
        }
    }
}
