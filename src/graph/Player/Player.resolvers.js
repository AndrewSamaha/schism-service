const { generateAuthToken } = require('../../helpers/authTokens.js');

module.exports = {
    Query: {
        getAllPlayers: (parent, args, context, info, ) => {
            return context.players
        },
        getPlayerById: (parent, args, context) => {
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
        generateAuthToken: (parent, args, context) => {
          const { name, password } = args;
          const existingPlayer = context.players.find(player => { return player.name === name; });
          if (!existingPlayer) {
              return {
                  __typename: 'ErrorAuthentication',
                  message: 'Authentication error'
              };
          }
          existingPlayer.authToken = generateAuthToken();
          console.log({token: existingPlayer.authToken});
          return {
              __typename: 'Player',
              ...existingPlayer
          };
        }
    }
}