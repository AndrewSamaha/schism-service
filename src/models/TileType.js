const path = require('path');
const { Model } = require('objection');

const TABLENAME = 'TileTypes';

// Three ways to create relations while avoiding loops!
// https://vincit.github.io/objection.js/guide/relations.html#require-loops
// Below, I'm trying solution
class TileType extends Model {
    static get tableName() { return TABLENAME; }
    static relationMappings = {
        Terrain: {
            relation: Model.HasManyRelation,
            modelClass: path.join(__dirname, 'Terrain'),
            join: {
                from: `${TABLENAME}.id`,
                to: `Terrain.tileTypeId`
            }
        }
    }
}

async function createSchema(knex) {
    if (await knex.schema.hasTable(TABLENAME)) {
        console.log(`createSchema ${TABLENAME} failed/ table exists`)
        return;
    }

    await knex.schema.createTable(TABLENAME, table => {
        table.increments('id').primary();
        table.string('src');
    });

    console.log(`created ${TABLENAME}`);
}

module.exports = {
    TABLENAME,
    TileType,
    createSchema
}
