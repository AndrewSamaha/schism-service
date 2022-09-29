const { getPlayerFromToken } = require('./authTokens');
const { players } = require('../mocks/players');
const { knex } = require('../db/sqlite/sqlite');
const { getJWTSecretAndQuit } = require('../db/redis/redis');

const createContext = async (args) => {
    const { req } = args;
    const token = req.headers.authorization || 'NOTOKEN';
    const secret = await getJWTSecretAndQuit();
    const player = getPlayerFromToken(token, secret);
    return {
        player,
        players,
        secret,
        knex
    }
}

exports.createContext = createContext;