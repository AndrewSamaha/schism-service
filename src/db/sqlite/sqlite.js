const Knex = require('knex');
const { SQLITE_DB_FILE } = require('../../constants/db');

const FILEPATH = `./data/${SQLITE_DB_FILE}`;
console.log({FILEPATH});
const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: FILEPATH
    }
});

module.exports = {
    knex
}
