import mainSchema from '../graph/schema/mainSchema';
import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: mainSchema,
  graphiql: true
}));

export default app