import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } from 'graphql'

export const MessageType = new GraphQLObjectType({
    name: 'Messsage',
    fields: () => ({
        successful: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        status: { type: GraphQLInt }
    })
})
