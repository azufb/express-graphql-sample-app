import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, buildSchema } from 'graphql';
const app: express.Express = express();
const port: number = 3000;

let sampleUsers = [
  {
    id: 1,
    name: 'user_1',
    comment: 'hello',
  },
  {
    id: 2,
    name: 'user_2',
    comment: 'hello world',
  },
  {
    id: 3,
    name: 'user_3',
    comment: 'bye',
  },
];

// APIのデータ型の集合をスキーマと言う
const schema: GraphQLSchema = buildSchema(`
  type SampleUser {
    id: Int,
    name: String,
    comment: String
  }

  type Query {
    hello(name: String): String
    sampleUsers: [SampleUser]
  }

  type Mutation {
    addSampleUser(name: String, comment: String): SampleUser
  }
`);

// データを操作する処理を記述するのがリゾルバ
const root = {
  hello: () => {
    return `Hello!`;
  },
  sampleUsers: () => {
    return sampleUsers;
  },
  addSampleUser: (args: { name: string; comment: string }) => {
    const id = sampleUsers.length === 0 ? 1 : sampleUsers.length + 1;
    const addUser = {
      id: id,
      name: args.name,
      comment: args.comment,
    };
    sampleUsers = [...sampleUsers, addUser];
    return addUser;
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
