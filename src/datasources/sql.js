const { SQLDataSource } = require("datasource-sql");
const { modelCollection } = require('../db/modelCollection');

class SQLds extends SQLDataSource {
    /// https://www.apollographql.com/docs/apollo-server/data/data-sources/
    /// https://github.com/cvburgess/SQLDataSource
    constructor(config) {
        // Always call super()
        console.log({config});
        super(config);
        // Sets the base URL for the REST API
        this.baseURL = 'https://movies-api.example.com/';
    }

    async getAllTerrain() {
        console.log('getAllTerrain')
        const Terrain = modelCollection.filter(model => model.Terrain)[0];
        Terrain.knex(this.knex);
        const terrain = await Terrain.query().select('x','y').withGraphFetched('TileType');
        console.log('SQLdataSource getAllTerrain', terrain);
        return terrain;
    }

    async getTile(x, y){
        console.log('getAllTerrain')
        const Terrain = modelCollection.filter(model => model.Terrain)[0];
        Terrain.knex(this.knex);
        const tile = await Terrain.query().select('x','y').withGraphFetched('TileType').where('x',x).andWhere('y',y);
        console.log(`SQLdataSource getTile(${x},${y})`,tile);
        return tile;
    }
}

module.exports = SQLds;