import { RolType } from '../TypeDefs/Rol'
import { GraphQLString, GraphQLInt } from "graphql"
import { Rol } from '../../Entities/Rol'

export const CREATE_ROL = {
    type: RolType,
    args: {
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }        
    },
    async resolve(parent: any, args: any) {
        const { nombre, estado } = args
        await Rol.insert({nombre, estado})
        return args
    }
}
