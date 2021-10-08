const userLogic = require("../business-logic-layer/user-logic");

const express = require("express");
const UserModel = require("../models/user-model");
const router = express.Router();

//get all users
//http://localhost:3001/api/users
router.get("/api/users", async (request, response) => {
    try {
        console.log("getting all users...");
        const users = await userLogic.getAllUsers();
        console.log("users has been sent...");
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//add user to DB
//http://localhost:3001/api/users
router.post("/api/users", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const addedUser = await userLogic.addUser(user);
        response.json(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;