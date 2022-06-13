const { Model } = require('objection');
const { WORLD_SIZE } = require('../../constants/world');
const { TileType } = require('../TileType.js');

// https://github.com/Vincit/objection.js/issues/1417

const createLandOrWater = async (Terrain) => {
    const startPos = { x: 0, y: 0 };
    const pLand = 0.75;
    const land = await TileType.query().findOne('type','land');
    const water = await TileType.query().findOne('type','water');
    for (let x = startPos.x; x < startPos.x + WORLD_SIZE.x; x++) {
        for (let y = startPos.y; y < startPos.y + WORLD_SIZE.y; y++) {
            const tileTypeId = Math.random() <= pLand ? land.id : water.id;
            const terrain = await Terrain.query().insert({
                x,
                y,
                //TileType: pLand ? land : water
                tileTypeId //: tileType
            });
            // console.log({tileType})
        }
    }
}

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
    
    await createLandOrWater(Terrain);

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
    console.log(verifiedTerrain);
}

module.exports = {
    seed
};
