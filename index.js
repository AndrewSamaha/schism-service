const { ApolloServer, gql } = require('apollo-server');
const find = require('lodash/find');

const players = [
    {
        id: 1,
        name: "Paul Atreides",
        authToken: 'pa',
        gameState: null
    },
    {
        id: 2,
        name: "Baron Harkonnen",
        authToken: 'bh',
        gameState: {
            position: {
                x: 100,
                y: 0,
                z: 0
            }
        }
    }
];

// The GraphQL schema
const typeDefs = gql`
    union PlayerResponse = Player | ErrorPlayerAlreadyExists
    
    "A player"
    type Player {
        id: ID!
        name: String
        gameState: GameState
        authToken: String
    }

    type ErrorPlayerAlreadyExists {
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
        createPlayer(name: String!): PlayerResponse
    }

    type Query {
        "A simple type for getting started!"
        hello: String
        getAllPlayers: [Player]
        getPlayerById(id: ID!): Player
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    getAllPlayers: () => players,
    getPlayerById: (parent, args) => {
        const { id } = args;
        const player = players.find(player => { return player.id == id; });
        return player;
    }
  },
  Mutation: {
      createPlayer: (parent, args) => {
        const { name } = args;
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
      }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
1
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});