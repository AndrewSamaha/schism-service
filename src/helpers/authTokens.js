const { randomBytes } = require('crypto');
const jwt = require('jsonwebtoken');

const generateAuthToken = () => randomBytes(48).toString('hex');

const secret = generateAuthToken();

const getPlayerFromToken = (token, secret) => {
    const noPlayer = { loggedIn: false, id: null };
    const player = { loggedIn: true, id: null };
    if (process.env.DEVELOPMENT && token === 'DEVELOPMENT') {
        player.id = 1;
        return player;
    }
    try {
        const payload = jwt.verify(token, secret);
        player.id = payload.id;
    } catch (e) {
        noPlayer.error = e.message;
        console.log({secret, token});
        console.log(e)
        console.log(e.message)
        return noPlayer;
    }
    return player;
}

exports.generateAuthToken = generateAuthToken;
exports.secret = secret;
exports.getPlayerFromToken = getPlayerFromToken;