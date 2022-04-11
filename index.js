const { ApolloServer, gql } = require('apollo-server');
const find = require('lodash/find');
const { generateAuthToken } = require('./src/helpers/authTokens.js');
const { players } = require('./src/mocks/players');

// The GraphQL schema
const typeDefs = gql`
    union PlayerResponse = Player | ErrorPlayerAlreadyExists
    
    "A player"
    type Player {
        id: ID!
        name: String
        gameState: GameState
        authToken: String
        password: String
    }

    type ErrorPlayerAlreadyExists {
        message: String
    }

    union GenerateAuthTokenResponse = Player | ErrorAuthentication

    type ErrorAuthentication {
        message: String
    }

    type GameState {
        position: Position
    }

    type Position {
        x: Float
        y: Float
        z: Float
    }

    type Mutation {
        "Create a player"
        createPlayer(name: String!, password: String!): PlayerResponse
        generateAuthToken(name: String!, password: String!): GenerateAuthTokenResponse
    }

    type Query {
        "Returns a list of all players"
        getAllPlayers: [Player]
        "Returns a player by its ID"
        getPlayerById(id: ID!): Player
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    getAllPlayers: () => players,
    getPlayerById: (parent, args) => {
        const { id } = args;
        const player = players.find(player => { return player.id == id; });
        return player;
    }
  },
  Mutation: {
      createPlayer: (parent, args) => {
        const { name, password } = args;
        const existingPlayer = players.find(player => { return player.name === name; });
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
        players.push(player);
        return player;
      },
      generateAuthToken: (parent, args) => {
        const { name, password } = args;
        const existingPlayer = players.find(player => { return player.name === name; });
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
