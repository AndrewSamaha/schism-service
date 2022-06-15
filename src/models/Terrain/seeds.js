const { Model } = require('objection');
const { WORLD_SIZE } = require('../../constants/world');
const { TileType } = require('../TileType.js');
const startPos = { x: 0, y: 0 };

// https://github.com/Vincit/objection.js/issues/1417

const createLandOrWater = async (Terrain) => {
    const pLand = 0.75;
    const land = await TileType.query().findOne('type','land');
    const water = await TileType.query().findOne('type','water');
    const waterList = [];
    const landList = [];
    for (let x = startPos.x; x < startPos.x + WORLD_SIZE.x; x++) {
        for (let y = startPos.y; y < startPos.y + WORLD_SIZE.y; y++) {
            const isLand = Math.random() <= pLand;
            const tileTypeId = isLand ? land.id : water.id;
            const terrain = await Terrain.query().insert({
                x,
                y,
                //TileType: pLand ? land : water
                tileTypeId //: tileType
            });
            if (isLand) landList.push({x, y});
            else waterList.push({x, y});
        }
    }
    return {landList, waterList};
}

const countTiles = (inputTileArray, pos, radius) => {
    const count = inputTileArray.reduce((lastValue, currentTile) => {
        if ((currentTile.x >= pos.x - radius) &&
            (currentTile.y >= pos.y - radius) &&
            (currentTile.x <= pos.x + radius) &&
            (currentTile.y <= pos.y + radius))
            return lastValue+1;
        return lastValue;
    }, 0);
    return count;
}
// const buildCountArray = (input, radius) => {
//     const countArray = input.map(terrain => {
//         if (terrain.x)
//     })
// }

// const applyToTerrain = (fn) => {
//     const startPos = { x: 0, y: 0 };
//     for (let x = startPos.x; x < startPos.x + WORLD_SIZE.x; x++) {
//         for (let y = startPos.y; y < startPos.y + WORLD_SIZE.y; y++) {
//             const terrain = await Terrain.query().insert({
//                 x,
//                 y
//             });
//         }
//     }
// }

async function seed(Terrain) {
    
    const {waterList, landList} = await createLandOrWater(Terrain);
    const countMap = landList.map(tile => {
        const radius = 1;
        const {x, y} = tile;
        return {
            x,
            y,
            nearbyLand: countTiles(landList, {x, y}, radius),
            radius
        }
    });
    console.log({countMap});
    
    const verifiedTerrain = await Terrain
        .query()
        .select('x','y')
        //.allowGraph('TileType')
        .withGraphFetched('TileType')
        // .withGraphFetched({
        //     TileType: true
        // })
        //.joinRelated('TileType')
        // .where('TileType.id','tileTypeid')
        ; // .orderBy('id');
    // const verifiedTerrain = await Terrain.query().orderBy('id');
    
    //console.log(verifiedTerrain);
}

module.exports = {
    seed
};
