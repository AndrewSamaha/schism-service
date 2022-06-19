require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { createContext } = require('./src/helpers/context');
const { typeDefs, resolvers } = require('./src/graph/index')
const { knex, knexConfig } = require('./src/db/sqlite/sqlite');
const SQLds = require('./src/datasources/sql');
const { deploy } = require('./src/db/deploy');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
    dataSources: () => {
        return {
            db: new SQLds(knexConfig)
        }
    },
});

deploy(knex);

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
