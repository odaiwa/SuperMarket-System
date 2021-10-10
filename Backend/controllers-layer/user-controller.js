const userLogic = require("../business-logic-layer/user-logic");

const express = require("express");
const UserModel = require("../models/user-model");
const router = express.Router();

//get all users
//http://localhost:3001/api/users
router.get("/api/users", async (request, response) => {
    try {
        const users = await userLogic.getAllUsers();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//get user by id
//http://localhost:3001/api/users
router.get("/api/users/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const user = await userLogic.getUserById(_id);
        //check if the user exists in DB.
        if(!user) return response.status(404).send(`_id ${_id} not found`);
        response.json(user);
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