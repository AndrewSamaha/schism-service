const { Terrain, createSchema: createSchemaTerrain } = require('../models/Terrain');
const { TileType, createSchema: createSchemaTileType } = require('../models/TileType');

const deploy = async (knex) => {
    console.log('deploying database schema');
    await createSchemaTileType(knex);
    await createSchemaTerrain(knex);
    console.log('finished deploying schema');
}

module.exports = {
    deploy
}
