import { GraphQLObjectType, GraphQLString } from "graphql"

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: (GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

export default AuthorType