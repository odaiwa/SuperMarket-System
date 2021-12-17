const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorHelper = require("../helpers/errors-helper");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
const CredentialsModel = require("../models/credentials-model");
const router = express.Router();



router.post("/register", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const errors = await user.validateSync();
        if (errors) return response.status(400).send(errors.message);
        user.isAdmin = 0;
        if(authLogic.validateUserIdAsync(user._id)) return response.status(401).send("ID already hsa been taken.");
        const addedUser = await authLogic.registerAsync(user);
        response.status(201).json(addedUser);
    } catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/login", async (request, response) => {
    try {
        let user = new CredentialsModel(request.body);
        user.password = cryptoHelper.hash(user.password);
        console.log(user);
        const errors = await user.validateSync();
        if (errors) return response.status(400).send(errors.message);
        const loggedInUser = await authLogic.userLoginAsync(user.email, user.password);
        if (!loggedInUser) {
            return response.status(401).send("incorrect email or password");
        }
        console.log("log-in token "+loggedInUser.token);
        response.status(201).json(loggedInUser);

    } catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});


module.exports = router;