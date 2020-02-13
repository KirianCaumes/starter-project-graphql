import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';

import fakeDatabase from "./FakeDatabase"
/*
const posts = new GraphQLObjectType({
    name: 'posts',
    fields: () => ({
      id: { type: graphql.GraphQLString },
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      author: { type: GraphQLString },
    })
  });
  */
/*
const queryRoot = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: GraphQLString,
            resolve: () => "Hello World"
        },
        posts : {
            type:new GraphQLList(posts),
            resolve: () => fakeDatabase.getBlogPosts()
        }
    })
})
*/
const posts = {
      id: { type: String },
      title: { type: String },
      content: { type: String },
      author: { type: String },
    }

const queryRoot = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        posts : {
            type:[posts]
        }
    }
})
const schema = new GraphQLSchema({ query: queryRoot })

export default schema