const { modelCollection } = require('./modelCollection');

const deploy = async (knex) => {
    console.log('deploying database schema');
    await modelCollection.sort((a,b) => a.PRIORITY - b.PRIORITY).map(async x => {
        console.log('deploying', x.TABLENAME, 'priority: ', x.PRIORITY);
        await x.createSchema(knex);
        if (x.seed) await x.seed(knex);
    });
    console.log('finished deploying schema');
}

module.exports = {
    deploy
}
