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
        },
        getChunk: async(_, args, { dataSources }) => {
            const { positions, chunkSize } = args;
            return {
                tiles: await dataSources.db.getTilesInChunk(args),
                position: positions,
                stateTimeUTC: new Date().getTime(),
                chunkSize
            }
        },
        getChunkCollection: async(_, args, { dataSources }) => {
            const { positions, chunkSize } = args;
            const startTime = Date.now();
            const chunks = await positions.map((position) => {
                const { x, y } = position;
                const tiles = dataSources.db.getTilesInChunk({positions: [position], chunkSize});
                return {
                    x,
                    y,
                    tiles
                }
            })
            const queryDuration = Date.now() - startTime;
            return {
                chunkSize,
                chunks,
                stateTimeUTC: new Date().getTime(),
                queryDuration
            }
        }
    }
};