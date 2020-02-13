import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';

import { fakeDatabase } from "./FakeDatabase"

const PostType = new GraphQLObjectType({
    name: 'post',
    fields: () => ({
        id: { type: (GraphQLInt) },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        author: { type: AuthorType, resolve: (parent,args) => fakeDatabase.getAuthor(parent.author) },
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: (GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const queryRoot = new GraphQLObjectType({
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

const schema = new GraphQLSchema({ query: queryRoot })

export default schema