const path = require('path')
const { Model } = require('objection');

const TABLENAME = 'Terrain';
const PRIORITY = 100;

class Terrain extends Model {
    static get tableName() { return TABLENAME; }
    static get relationMapping() {
        const TileType = require('./TileType.js');
        return {
            TileType: {
                relation: Model.HasOneRelation,
                modelClass: TileType,
                join: {
                    from: `${TABLENAME}.tileTypeId`,
                    to: `${TileType.TABLENAME}.id`
                }
            }
        }
    }
}

async function createSchema(knex) {
    console.log(`createSchema ${TABLENAME}`);
    if (await knex.schema.hasTable(TABLENAME)) {
        console.log(`createSchema ${TABLENAME} failed/ table exists`)
        return false;
    }

    await knex.schema.createTable(TABLENAME, table => {
        table.increments('id').primary();
        table.integer('tileTypeId');//.references('id').inTable('TileTypes');
        table.integer('x');
        table.integer('y');
        // table.integer('z');
    });

    console.log(`created ${TABLENAME}`);
    return true;
}

async function seed(knex) {
    Model.knex(knex);
    const { TileType } = require('./TileType.js');
    const tileTypes = await TileType.query().orderBy('id');
    const rowSize = 2;
    const rows = 2;
    const startPos = { x: 0, y: 0 };
    for (let x = startPos.x; x < startPos.x + rowSize; x++) {
        for (let y = startPos.y; y < startPos.y + rows; y++) {
            await Terrain.query().insertGraph({
                x,
                y,
                tileTypeId: 1
            });
        }
    }
    const verifiedTerrain = await Terrain
        .query()
        .joinRelated('TileType')
        .where('TileType.id','tileTypeid')
        ; // .orderBy('id');
    // const verifiedTerrain = await Terrain.query().orderBy('id');
    console.log({verifiedTerrain});
}

module.exports = {
    TABLENAME,
    Terrain,
    createSchema,
    PRIORITY,
    seed
}
