const hardCodedTile = {
    __typename: 'Tile',
    id: 0,
    x: 444,
    y: 444,
    type: 'Hardcoded Tile'
};

module.exports = {
    Query: {
        getAllTiles: (parent, args, context, info, ) => {
            // const { dataSources } = context;
            // const { db } = dataSources;
            // return db.getAllTerrain();
            return [hardCodedTile, hardCodedTile];
        },
        getTile: (parent, args, context) => {
            // const { x, y } = args;
            return hardCodedTile;
        }
    }
};