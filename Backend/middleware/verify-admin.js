const jwt = require("jsonwebtoken");

function verifyIsAdmin(request, response, next) {
    if (!request.headers.authorization)
        return response.status(401).send("You are not logged in!");

    const token = request.headers.authorization.split(" ")[1];
    if (!token)
        return response.status(401).send("You are not logged in!");

    jwt.verify(token, global.config.jwtKey, (err, payload) => { 
        if (err && err.message === "jwt expired")
            return response.status(403).send("Your login session has expired.");

        if (err)
            return response.status(401).send("You are not logged in!");

        if (!payload.payload.isAdmin) return response.status(403).send("You are not authorized.");

        next();
    });
}

module.exports = verifyIsAdmin;