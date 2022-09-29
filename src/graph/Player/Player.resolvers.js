const jwt = require('jsonwebtoken');
const { generateAuthToken, secret } = require('../../helpers/authTokens');

// const getJwtSecret = async (context) => {
//     if (context.secret) return secret;
    
//     const { dataSources } = context;
//     const { redis } = dataSources;
//     const secretFromRedis = await redis.getJWTSecret();
//     if (secretFromRedis) return secretFromRedis;

//     const newSecret = generateAuthToken();
//     await redis.setJwtSecret(newSecret);
//     context.secret = newSecret;
//     return newSecret;
// }

module.exports = {
    Query: {
        getAllPlayers: (parent, args, context, info, ) => {
            console.log('query getAllPlayers')
            return context.players
        },
        getPlayerById: (parent, args, context) => {
            console.log('query getPlayerById')
            const { id } = args;
            const player = context.players.find(player => { return player.id == id; });
            return player;
        }
    },
    Mutation: {
        createPlayer: (parent, args, context) => {
            const { name, password } = args;
            const existingPlayer = context.players.find(player => { return player.name === name; });
            if (existingPlayer) {
                return {
                    __typename: 'ErrorPlayerAlreadyExists',
                    message: 'A player by that name already exists'
                };
            }
            const player = {
                __typename: 'Player',
                id: Math.floor(Math.random()*100),
                name,
                password,
                gameState: {
                    position: {
                        x: Math.floor(Math.random()*100),
                        y: Math.floor(Math.random()*100),
                        z: Math.floor(Math.random()*100)
                    }
                }
            }
            context.players.push(player);
            return player;
        },
        login: async (parent, args, context) => {
            console.log('Mutation login');

            const { name, password } = args;
            const { secret } = context;
            console.log({loginattempt: name, password: password});
        
            const existingPlayer = context.players.find(player => { return player.name === name; });

            if (!existingPlayer) {
                return {
                    __typename: 'ErrorAuthentication',
                    message: 'Authentication error'
                };
            }
            const payload = {
                id: existingPlayer.id,
                name: existingPlayer.name
            }
            const authToken = jwt.sign(payload, secret, {
                expiresIn: '12h'
            });
            existingPlayer.authToken = authToken;
            console.log({existingPlayer});
            console.log({token: existingPlayer.authToken});
            return {
                __typename: 'Player',
                ...existingPlayer
            };
        }
    }
}