import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'

export const TipoTrabajoType = new GraphQLObjectType({
    name: 'TipoTrabajo',
    fields: () => ({
        id_tipo_trabajo: { type:  GraphQLID },
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }
    })
})
