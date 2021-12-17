const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorHelper = require("../helpers/errors-helper");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
// const CredentialsModel = require("../models/CredentialsModel");
const router = express.Router();



router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        user.isAdmin = 0;

        // user.password = cryptoHelper.hash(password);
        const addedUser = await authLogic.registerAsync(user);
        response.status(201).json(addedUser);
    } catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/login", async (request, response) => {
    try {
        
        let {
            username,
            password
        } = request.body;

        password = cryptoHelper.hash(password);
        const loggedInUser = await authLogic.userLoginAsync(username, password);
        if (!loggedInUser) {
            response.status(500).send(errorHelper.getError(err));
        }
        response.status(201).json(loggedInUser);

    } catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});


module.exports = router;