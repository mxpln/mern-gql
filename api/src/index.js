import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};
async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  // Required logic for integrating with Express
  await server.start();

  const app = express();

  server.applyMiddleware({
    app,
    path: "/api",
  });

  // Modified server startup
  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
