const { getPlayerFromToken, secret } = require('./authTokens');
const { players } = require('../mocks/players');
const { knex } = require('../db/sqlite/sqlite');

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

exports.createContext = createContext;