const { RESTDataSource } = require("apollo-datasource-rest");
const PLAYER_JWT_SECRET_KEY = 'playerJwtSecret';

class RedisDs extends RESTDataSource {
    /// https://www.apollographql.com/docs/apollo-server/data/data-sources/
    constructor(client) {
        super();
        this.client = client;
    }

    async getJWTSecret() {
        const client = await this.client;
        const secret = client.get(PLAYER_JWT_SECRET_KEY);
        return secret;
    }

    async setJwtSecret(secret){
        const client = await this.client;
        await client.set(PLAYER_JWT_SECRET_KEY, secret);
    }
}

module.exports = RedisDs;