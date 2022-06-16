const { SQLDataSource } = require("datasource-sql");
const { modelCollection } = require('../db/modelCollection');

class SQLds extends SQLDataSource {
    /// https://www.apollographql.com/docs/apollo-server/data/data-sources/
    /// https://github.com/cvburgess/SQLDataSource
    constructor() {
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = 'https://movies-api.example.com/';
    }

    getAllTerrain() {
        const Terrain = modelCollection.filter(model => model.Terrain)[0];
        Terrain.knex(this.knex);
        const terrain = await Terrain.query().select('x','y').withGraphFetched('TileType');
        return terrain;
    }
}

module.exports = SQLds;