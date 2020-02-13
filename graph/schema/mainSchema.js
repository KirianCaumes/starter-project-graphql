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
import Post from '../../models/post'
import AuthorType from '../type/authorType'

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
                // resolve: async () => {
                //     return await Post.find({})
                //         .exec()
                //         .then(data => {
                //             return data
                //         })
                //         .catch(err => {
                //             throw err
                //         })
                // }
            },
            post: {
                type: PostType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                },
                resolve: (parent, args) => fakeDatabase.getBlogPost(args.id)
            },
            author: {
                type: AuthorType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                },
                resolve: (parent, args) => fakeDatabase.getAuthor(args.id)
            }
        })
    })
})

export default mainSchema