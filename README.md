# schism-service
Schism back-end service currently responsible for world generation, world queries/mutations, and user authentication (JWT token creation).

Also contains docker-compose configuration for redis cache.

# Environment Setup
1. Rename `example.env` to `.env`
1. `npm i`
1. Start the redis cache `npm run start:deps`
1. Start the service `npm run start:dev`.

On first run, schism-service will create a sqlite database, connect to it, and generate a world.
