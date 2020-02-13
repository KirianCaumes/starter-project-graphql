import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql"
import PostType from "./postType"
import { fakeDatabase } from "../../src/FakeDatabase"

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: (GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve: (parent, args) => fakeDatabase.getPostsOfAuthor(parent.id)
        }
    })
})

export default AuthorType