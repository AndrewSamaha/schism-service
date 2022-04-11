const { randomBytes } = require('crypto');

const generateAuthToken = () => randomBytes(48).toString('hex');

exports.generateAuthToken = generateAuthToken;