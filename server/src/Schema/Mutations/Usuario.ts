import { UsuarioType } from "../TypeDefs/Usuario"
import { GraphQLString, GraphQLInt, GraphQLID } from "graphql"
import { Usuario } from "../../Entities/Usuario"
import { IUsuario } from "../../Interfaces/Usuario"
import { Rol } from "../../Entities/Rol"

export const CREATE_USUARIO = {
    type: UsuarioType,
    args: {
        usuario: { type: GraphQLString },
        nombre: { type: GraphQLString },
        contrasena: { type: GraphQLString },
        email: { type: GraphQLString },
        id_rol: { type: GraphQLID },
        estado: { type: GraphQLInt }
    },
    async resolve(_: any, args: IUsuario): Promise<IUsuario | null> {
        const { usuario, nombre, contrasena, email, id_rol, estado } = args
        await Usuario.insert({usuario, nombre, contrasena, email, id_rol, estado})
        return args
    }
}
