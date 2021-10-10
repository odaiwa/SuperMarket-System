const jwt = require("jsonwebtoken"); 

// JSON web token:

function getNewToken(payload) { 
    return jwt.sign({ payload }, config.jwtKey, { expiresIn: "1h" });
}

module.exports = {
    getNewToken
};