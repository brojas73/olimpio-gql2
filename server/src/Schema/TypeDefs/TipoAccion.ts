import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'

export const TipoAccionType = new GraphQLObjectType({
    name: 'TipoAccion',
    fields: () => ({
        id_tipo_accion: { type:  GraphQLID },
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }
    })
})
