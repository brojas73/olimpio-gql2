import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'

export const RolType = new GraphQLObjectType({
    name: 'Rol',
    fields: () => ({
        id_rol: { type:  GraphQLID },
        nombre: { type: GraphQLString },
        estado: { type: GraphQLInt }
    })
})
