import { SucursalType } from "../TypeDefs/Sucursal"
import { Sucursal } from '../../Entities/Sucursal'
import { GraphQLString, GraphQLInt } from "graphql"

export const CREATE_SUCURSAL = {
    type: SucursalType,
    args: {
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }        
    },
    async resolve(parent: any, args: any) {
        const { nombre, estado } = args
        await Sucursal.insert({nombre, estado})
        return args
    }
}
