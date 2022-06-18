const { ApolloServer, gql } = require('apollo-server');
const find = require('lodash/find');
const jwt = require('jsonwebtoken');
const { players } = require('./src/mocks/players');

const { typeDefs, resolvers } = require('./src/graph/index')
const { generateAuthToken } = require('./src/helpers/authTokens');
const { knex, knexConfig } = require('./src/db/sqlite/sqlite');
const SQLds = require('./src/datasources/sql');
const { deploy } = require('./src/db/deploy');

    
const secret = generateAuthToken();
console.log({secret});
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        db: new SQLds(knexConfig)
    },
    context: ({ req }) => {
        const player = { loggedIn: false, id: null };
        const token = req.headers.authorization || 'NOTOKEN';
        
        console.log({secret, receivedToken: token});

        try {
            const payload = jwt.verify(token, secret);
            console.log({payload});
            player.logggedIn = true;
            player.id = payload?.id || 0;
        } catch (e) {
            console.log(e)
        }
        return {
            player,
            players,
            secret,
            knex
        };
    }
});

deploy(knex);

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
