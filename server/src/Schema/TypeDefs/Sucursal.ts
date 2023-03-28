import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'

export const SucursalType = new GraphQLObjectType({
    name: 'Sucursal',
    fields: () => ({
        id_sucursal: { type: GraphQLID },
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }
    })
})
