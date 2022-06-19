const { SQLDataSource } = require("datasource-sql");
const { modelCollection } = require('../db/modelCollection');

class SQLds extends SQLDataSource {
    /// https://www.apollographql.com/docs/apollo-server/data/data-sources/
    /// https://github.com/cvburgess/SQLDataSource

    async getAllTerrain() {
        const { Terrain } = modelCollection.filter(model => model.Terrain)[0];
        Terrain.knex(this.knex);
        const terrain = await Terrain.query().select('id','x','y').withGraphFetched('TileType');
        return terrain;
    }

    async getTile(args){
        const { x, y } = args;
        const { Terrain } = modelCollection.filter(model => model.Terrain)[0];
        Terrain.knex(this.knex);
        const tile = await Terrain.query().select('id','x','y').where('x',x).andWhere('y',y).withGraphFetched('TileType').first();
        return tile;
    }
}

module.exports = SQLds;