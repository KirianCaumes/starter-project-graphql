import mainSchema from '../graph/schema/mainSchema';
import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from 'dotenv'

import  Author from "../models/author"
import { fakeDatabase } from './FakeDatabase';
import Post from '../models/post';

dotenv.config()

const app = express();

app.use(cors());

// mongoose.connect(process.env.DB_HOST, { user: process.env.DB_USER, pass: process.env.DB_PASSWORD, auth: { authdb: "admin" }, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }).then(
//     () => console.log("Connected to MongoDB"),
//     err => console.error(err)
// )

app.use('/graphql', graphqlHTTP({
    schema: mainSchema,
    graphiql: true
}));

//Populate mongosse from fakedata
app.use('/populate', async (req, res) => {
    await Author.deleteMany({});
    await Post.deleteMany({});

    for await (const author of fakeDatabase.authors) {
        let myAuthor = new Author({
            _id: author.id,
            name: author.name,
            email: author.email,
        })
        await myAuthor.save()
    }
    
    for await (const post of fakeDatabase.blogPosts) {
        let myPost = new Post({
            _id: post.id,
            title: post.title,
            content: post.content,
            authorId: post.author
        })
        await myPost.save()
    }

    res.send("ok")

})

export default app