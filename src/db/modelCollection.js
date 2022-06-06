const modelCollection = [
    { ...require('../models/Terrain') },
    { ...require('../models/TileType') }
];

modelCollection.map((m) => console.log(m));

module.exports = {
    modelCollection
}
