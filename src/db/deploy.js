const { modelCollection } = require('./modelCollection');

const deploy = async (knex) => {
    console.log('deploying database schema');
    await modelCollection.map(x => x.createSchema(knex));
    console.log('finished deploying schema');
}

module.exports = {
    deploy
}
