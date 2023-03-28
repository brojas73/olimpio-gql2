import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'
import { Rol } from '../../Entities/Rol'
import { IRol } from '../../Interfaces/Rol'
import { IUsuario } from '../../Interfaces/Usuario'
import { RolType } from './Rol'

export const UsuarioType = new GraphQLObjectType({
    name: 'Usuario',
    fields: () => ({
        id_usuario: { type:  GraphQLID },
        usuario: { type: GraphQLString },
        nombre: { type: GraphQLString },
        contrasena: { type: GraphQLString },
        email: { type: GraphQLString },
        rol: { 
            type: RolType,
            async resolve(parent: IUsuario, _): Promise<IRol | null> {
                return await Rol.findOne({ where: {id_rol: parent.id_rol} })
            }
        },
        estado: { type: GraphQLInt }
    })
})
