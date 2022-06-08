const path = require('path')
const { Model } = require('objection');

const TABLENAME = 'Terrain';
const PRIORITY = 100;

class Terrain extends Model {
    static get tableName() { return TABLENAME; }
}

async function createSchema(knex) {
    console.log(`createSchema ${TABLENAME}`);
    if (await knex.schema.hasTable(TABLENAME)) {
        console.log(`createSchema ${TABLENAME} failed/ table exists`)
        return;
    }

    await knex.schema.createTable(TABLENAME, table => {
        table.increments('id').primary();
        table.integer('tileTypeId');
        table.integer('x');
        table.integer('y');
        table.integer('z');
    });

    console.log(`created ${TABLENAME}`);
}

// async function seed(knex) {
//     Model.knex(knex);
//     const types = [
//         'grass',
//         'stone',
//         'water',
//         'sand'
//     ];
//     types.map((type) => {
//         await TileType.query().insert({type})
//     });
//     const verifiedTypes = await TileType.query().orderBy('id');
//     console.log({verifiedTypes});
// }

module.exports = {
    TABLENAME,
    Terrain,
    createSchema,
    PRIORITY
}
