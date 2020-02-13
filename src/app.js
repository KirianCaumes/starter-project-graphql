import mainSchema from '../graph/schema/mainSchema';
import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(cors());

mongoose.connect(process.env.DB_HOST, { user: process.env.DB_USER, pass: process.env.DB_PASSWORD, auth: { authdb: "admin" }, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }).then(
    () => console.log("Connected to MongoDB"),
    err => console.error(err)
)

app.use('/graphql', graphqlHTTP({
    schema: mainSchema,
    graphiql: true
}));

export default app