const path = require('path')
const { Model } = require('objection');

const TABLENAME = 'Terrain';
const PRIORITY = 100;

class Terrain extends Model {
    static get tableName() { return TABLENAME; }
    static relationMappings() {
        const { TileType, TABLENAME: tileTypeTable } = require('./TileType.js');
        console.log('ADDING tileType relation to Terrain!!');
        const joinFrom = `${TABLENAME}.tileTypeId`;
        const joinTo = `${tileTypeTable}.id`;

        console.log('ADDING tileType relation to Terrain!!');
        console.log('   joinFrom', joinFrom);
        console.log('   joinTo', joinTo);
        return {
            TileType: {
               // relation: Model.HasOneRelation,
                relation: Model.BelongsToOneRelation,  // use BelongsToOneRelation when the source model (this model) has a foreign key
                modelClass: TileType,
                join: {
                    from: `${TABLENAME}.tileTypeId`,
                    to: `${tileTypeTable}.id`
                }
            }
        }
    }

    // async $beforeInsert(ctx) {
    //     await this.$relatedQuery('address', ctx.transaction).insertAndFetch({});
    //     this.createdAt = this.updatedAt = new Date();
    // }
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

// https://github.com/Vincit/objection.js/issues/1417
async function seed(knex) {
    Model.knex(knex);
    const { TileType } = require('./TileType.js');
    const tileTypes = await TileType.query().orderBy('id');
    const rowSize = 2;
    const rows = 2;
    const startPos = { x: 0, y: 0 };

    // terrain creation happens in two phases
    // 1. creating terrain squares without a TileType

    for (let x = startPos.x; x < startPos.x + rowSize; x++) {
        for (let y = startPos.y; y < startPos.y + rows; y++) {
            const terrain = await Terrain.query().insert({
                x,
                y
            });
            // // This works but it creates a new
            // const terrain = await Terrain.query().insert({
            //     x,
            //     y
            // })
            // await terrain.$relatedQuery('TileType').insert({
            //     type: 'grass'
            // })

            // // This works but it creates a new TileType
            // await Terrain.query().insertGraph({
            //     x,
            //     y,
            //     TileType: {
            //         type: 'grass'
            //     }
            // });
        }
    }
    const verifiedTerrain = await Terrain
        .query()
        //.joinRelated('TileType')
        // .where('TileType.id','tileTypeid')
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
