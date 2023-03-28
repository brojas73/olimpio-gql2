import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import { UsuarioType } from '../TypeDefs/Usuario'
import { Usuario } from '../../Entities/Usuario'
import { IUsuario } from '../../Interfaces/Usuario'

export const GET_ALL_USUARIOS = {
    type: new GraphQLList(UsuarioType),
    async resolve(): Promise<IUsuario[]> {
        return await Usuario.find()
    }
}

export const GET_USUARIO_BY_ID = {
    type: UsuarioType,
    args: {
        id_usuario: { type: GraphQLID },
    },
    async resolve(_: any, args: IUsuario): Promise<IUsuario | null> {
        return await Usuario.findOne({ where: { id_usuario: args.id_usuario } })    
    }
}

export const GET_USUARIO_BY_USUARIO = {
    type: UsuarioType,
    args: {
        usuario: { type: GraphQLString },
    },
    async resolve(_: any, args: IUsuario): Promise<IUsuario | null> {
        return await Usuario.findOne({ where: { usuario: args.usuario } })    
    }
}

export const GET_USUARIO_BY_USUARIO_AND_CONTRASENA = {
    type: UsuarioType,
    args: {
        usuario: { type: GraphQLString },
        contrasena: { type: GraphQLString },
    },
    async resolve(_: any, args: IUsuario): Promise<IUsuario | null> {
        return await Usuario.findOne({ where: { usuario: args.usuario, contrasena: args.contrasena} })    
    }
}
