require('dotenv').config();
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

const getPlayerFromToken = (token, secret) => {
    const noPlayer = { loggedIn: false, id: null };
    const player = { loggedIn: true, id: null };
    if (process.env.DEVELOPMENT && token === 'DEVELOPMENT') {
        player.id = 1;
        return player;
    }
    try {
        const payload = jwt.verify(token, secret);
        player.id = payload.id;
    } catch (e) {
        noPlayer.error = e.message;
        console.log({secret, token});
        console.log(e)
        console.log(e.message)
        return noPlayer;
    }
    return player;
}

const createContext = (args) => {
    const { req } = args;
    const token = req.headers.authorization || 'NOTOKEN';
    const player = getPlayerFromToken(token, secret);
    return {
        player,
        players,
        secret,
        knex
    }
}

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
