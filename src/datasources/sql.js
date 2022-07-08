const { SQLDataSource } = require("datasource-sql");
const { modelCollection } = require('../db/modelCollection');
const { Terrain } = require("../models/Terrain");

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

    async getTilesNear(args) {
        const { positions, range } = args;
        const { Terrain } = modelCollection.filter(model => model.Terrain)[0];
        Terrain.knex(this.knex);
        const rawQuery = positions.map(({x,y}) => {
            return `(Terrain.x >= '${(x-range)}' AND Terrain.x <= '${(x+range)}' AND Terrain.y >= '${(y-range)}' AND Terrain.y <= '${(y+range)}')`;
        }).join(' OR ');
        const terrain = await Terrain.query().select('id','x','y').distinct(['x','y'])
                            .whereRaw(rawQuery)
                            .withGraphFetched('TileType');
        // console.log('getNearbyTiles datasource', terrain, positions, range)
        return terrain;
    }

    async getTilesInChunk(args) {
        const { positions, chunkSize } = args;
        const { Terrain } = modelCollection.filter(model => model.Terrain)[0];
        Terrain.knex(this.knex);
        const rawQuery = positions.map(({x,y}) => {
            return `(Terrain.x >= '${(x)}' AND Terrain.x < '${(x+chunkSize)}' AND Terrain.y >= '${(y)}' AND Terrain.y < '${(y+chunkSize)}')`;
        }).join(' OR ');
        const terrain = await Terrain.query().select('id','x','y').distinct(['x','y'])
                            .whereRaw(rawQuery)
                            .withGraphFetched('TileType');
        return terrain;
    }
}

module.exports = SQLds;