const { ApolloServer, gql } = require('apollo-server');
const find = require('lodash/find');

const { players } = require('./src/mocks/players');

const { typeDefs, resolvers } = require('./src/graph/index')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
      players
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
