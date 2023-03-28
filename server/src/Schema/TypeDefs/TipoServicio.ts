import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'

export const TipoServicioType = new GraphQLObjectType({
    name: 'TipoServicio',
    fields: () => ({
        id_tipo_servicio: { type:  GraphQLID },
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }
    })
})
