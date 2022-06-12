const path = require('path');
const { Model } = require('objection');
const { create } = require('lodash');

const TABLENAME = 'TileTypes';
const PRIORITY = '1';

// Three ways to create relations while avoiding loops!
// https://vincit.github.io/objection.js/guide/relations.html#require-loops
// Below, I'm trying solution
class TileType extends Model {
    static get tableName() { return TABLENAME; }
}

async function createSchema(knex) {
    if (await knex.schema.hasTable(TABLENAME)) {
        console.log(`createSchema ${TABLENAME} failed/ table exists`)
        return false;
    }

    await knex.schema.createTable(TABLENAME, table => {
        table.increments('id').primary();
        table.string('type');
    });

    return true;
}

async function seed(knex) {
    if (!knex) {
        const error = `${TABLENAME}.seed(knex) was not actually passed a knex obejct`;
        console.log(error);
        throw(error);
        return;
    }

    Model.knex(knex);
    const types = [
        'land',
        'water',
        'grass',
        'stone',
        'sand'
    ];
    
    console.log('seeding');
    await types.map(async (type) => {
        await TileType.query().insert({type})
    });
    
    console.log('verifying...')
    const verifiedTypes = await TileType.query().orderBy('id');
    console.log({verifiedTypes});
}

module.exports = {
    TABLENAME,
    TileType,
    createSchema,
    seed,
    PRIORITY
}
