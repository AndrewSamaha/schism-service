const { userGroups } = require('../constants/accessControl');
const { PLAYER, SPECTATOR, SUPERUSER } = userGroups;
const players = [
    {
        id: 1,
        name: "Paul Atreides",
        authToken: 'pa',
        gameState: null,
        userGroups: [ PLAYER ]
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
        },
        userGroups: [ PLAYER ]
    },
    {
        id: 3,
        name: "Cthulhu",
        authToken: 'ra',
        gameState: null,
        userGroups: [ PLAYER, SUPERUSER ]
    },
    {
        id: 4,
        name: "spectator",
        authToken: 'ras',
        gameState: null,
        userGroups: [ SPECTATOR ]
    }
];

exports.players = players;
