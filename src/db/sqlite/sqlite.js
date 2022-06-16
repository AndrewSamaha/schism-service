const Knex = require('knex');
const { SQLITE_DB_FILE } = require('../../constants/db');

const FILEPATH = `./data/${SQLITE_DB_FILE}`;
console.log({FILEPATH});

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: FILEPATH
    }
};

const knex = Knex(knexConfig);

module.exports = {
    knex,
    knexConfig
}
