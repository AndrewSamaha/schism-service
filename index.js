require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');

const { createContext } = require('./src/helpers/context');
const { typeDefs, resolvers } = require('./src/graph/index');
// db objects
const { knex, knexConfig } = require('./src/db/sqlite/sqlite');
const { returnRedisConnection } = require('./src/db/redis/redis');

// datasources
const SQLds = require('./src/datasources/sql');
const RedisDs = require('./src/datasources/redis');

const { deploy } = require('./src/db/deploy');

const db = new SQLds(knexConfig);
const redis = new RedisDs(returnRedisConnection());

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    // typeDefs,
    // resolvers,
    context: createContext,
    dataSources: () => {
        //console.log('creating new knex ds');
        return {
            db,
            redis
        }
    },
});

deploy(knex);

server.listen({
    port: process.env.PORT
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
