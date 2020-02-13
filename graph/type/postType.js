import AuthorType from "./authorType"
import { GraphQLObjectType, GraphQLInt, GraphQLString } from "graphql"
import { fakeDatabase } from "../../src/FakeDatabase"

const PostType = new GraphQLObjectType({
    name: 'post',
    fields: () => ({
        id: { type: (GraphQLInt) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        // author: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => fakeDatabase.getAuthor(parent.author)
        }
    })
})

export default PostType