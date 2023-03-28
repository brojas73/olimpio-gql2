import { TipoServicioType } from "../TypeDefs/TipoServicio"
import { GraphQLString, GraphQLInt } from "graphql"
import { TipoServicio } from "../../Entities/TipoServicio"

export const CREATE_TIPO_SERVICIO = {
    type: TipoServicioType,
    args: {
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }        
    },
    async resolve(parent: any, args: any) {
        const { nombre, estado } = args
        await TipoServicio.insert({nombre, estado})
        return args
    }
}
