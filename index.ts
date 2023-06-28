import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, buildSchema } from 'graphql';
const app: express.Express = express();
const port: number = 3000;

// APIのデータ型の集合をスキーマと言う
const schema: GraphQLSchema = buildSchema(`
  type Query {
    hello(name: String): String
  }
`);

// データを操作する処理を記述するのがリゾルバ
const root = {
  hello: (args: { name: string }) => {
    return `Hello, ${args.name}!`;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
