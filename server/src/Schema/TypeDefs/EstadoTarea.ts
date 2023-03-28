import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'

export const EstadoTareaType = new GraphQLObjectType({
    name: 'EstadoTarea',
    fields: () => ({
        id_estado_tarea: { type:  GraphQLID },
        nombre: { type: GraphQLString },
        url: { type: GraphQLString },
        estado: { type: GraphQLInt }
    })
})
