const hardCodedTile = {
    __typename: 'Tile',
    id: 0,
    x: 444,
    y: 444,
    type: 'Hardcoded Tile'
};

module.exports = {
    Query: {
        // parent, args, context {dataSources}, info
        getAllTiles: async (_, __, {dataSources}) => {
            return await dataSources.db.getAllTerrain();
        },
        getTile: async (_, args, { dataSources }) => {
            return await dataSources.db.getTile(args);
        },
        getTilesNear: async (_, args, { dataSources }) => {
            return await dataSources.db.getTilesNear(args);
        },
        getWorldState: async(_, args, { dataSources }) => {
            const { positions, range } = args;
            return {
                tiles: await dataSources.db.getTilesNear(args),
                position: positions,
                stateTimeUTC: new Date().getTime(),
                range
            }
        }
    }
};