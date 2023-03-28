import { EstadoTareaType } from "../TypeDefs/EstadoTarea"
import { GraphQLString, GraphQLInt } from "graphql"
import { EstadoTarea } from "../../Entities/EstadoTarea"

export const CREATE_ESTADO_TAREA = {
    type: EstadoTareaType,
    args: {
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }        
    },
    async resolve(parent: any, args: any) {
        const { nombre, estado } = args
        await EstadoTarea.insert({nombre, estado})
        return args

    }
}
