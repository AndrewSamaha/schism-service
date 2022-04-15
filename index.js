const { ApolloServer, gql } = require('apollo-server');
const find = require('lodash/find');
const jwt = require('jsonwebtoken');
const { players } = require('./src/mocks/players');

const { typeDefs, resolvers } = require('./src/graph/index')
const { generateAuthToken } = require('./src/helpers/authTokens');

const secret = generateAuthToken();
console.log({secret});
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const player = { loggedIn: false, id: null };
        const token = req.headers.authorization || 'NOTOKEN';
        console.log({token});
        try {
            const payload = jwt.verify(token, secret);
            console.log({payload});
            player.logggedIn = true;
            player.id = payload.id || 0;
        } catch (e) {
            // console.log(e)
        }
        return {
            player,
            players,
            secret
        };
    }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
