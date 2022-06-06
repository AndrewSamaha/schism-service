const path = require('path')
const { Model } = require('objection');

const TABLENAME = 'Terrain';

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

module.exports = {
    TABLENAME,
    Terrain,
    createSchema
}
