const jwt = require("jsonwebtoken");

function getNewToken(payload) {
    return jwt.sign({ payload }, global.config.jwtKey, { expiresIn: "24h" });
}

module.exports = {
    getNewToken
};