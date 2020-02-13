import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql'

import { fakeDatabase } from "../../src/FakeDatabase"

import PostType from '../type/postType'

const mainSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            hello: {
                type: GraphQLString,
                resolve: () => "Hello World"
            },
            posts: {
                type: new GraphQLList(PostType),
                resolve: () => fakeDatabase.getBlogPosts()
            },
            post: {
                type: PostType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                },
                resolve: (parent, args) => fakeDatabase.getBlogPost(args.id)
            }
        })
    })
})

export default mainSchema