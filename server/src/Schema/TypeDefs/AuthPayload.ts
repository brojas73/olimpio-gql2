import { GraphQLObjectType, GraphQLString } from 'graphql'
import { Usuario } from '../../Entities/Usuario'
import { UsuarioType } from './Usuario'
import { IUsuario } from '../../Interfaces/Usuario'
import { MessageType } from './MessageType'

export const AuthPayloadType = new GraphQLObjectType({
    name: 'AuthPayload',
    fields: () => ({
        token: { type:  GraphQLString },
        status: { type: MessageType },
        usuario: { 
            type: UsuarioType,
            async resolve(parent, _): Promise<IUsuario | null> {
                const usuario = await Usuario.findOne( {where: {id_usuario: parent.usuario.id_usuario}} )
                return usuario
            }
        }
    })
})
