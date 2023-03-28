import { TipoAccionType } from "../TypeDefs/TipoAccion"
import { GraphQLString, GraphQLInt } from "graphql"
import { TipoAccion } from "../../Entities/TipoAccion"

export const CREATE_TIPO_ACCION = {
    type: TipoAccionType,
    args: {
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }        
    },
    async resolve(parent: any, args: any) {
        const { nombre, estado } = args
        await TipoAccion.insert({nombre, estado})
        return args
    }
}
