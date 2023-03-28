import { TipoTrabajoType } from "../TypeDefs/TipoTrabajo"
import { GraphQLString, GraphQLInt } from "graphql"
import { TipoTrabajo } from "../../Entities/TipoTrabajo"

export const CREATE_TIPO_TRABAJO = {
    type: TipoTrabajoType,
    args: {
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }        
    },
    async resolve(parent: any, args: any) {
        const { nombre, estado } = args
        await TipoTrabajo.insert({nombre, estado})
        return args
    }
}
