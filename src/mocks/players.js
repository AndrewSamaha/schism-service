const players = [
    {
        id: 1,
        name: "Paul Atreides",
        authToken: 'pa',
        gameState: null
    },
    {
        id: 2,
        name: "Baron Harkonnen",
        authToken: 'bh',
        gameState: {
            position: {
                x: 100,
                y: 0,
                z: 0
            }
        }
    }
];

exports.players = players;
