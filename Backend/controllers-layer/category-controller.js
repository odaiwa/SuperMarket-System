const categoryLogic = require("../business-logic-layer/category-logic");
const CategoryModel = require("../models/category-model");
const express = require("express");
const router = express.Router();

//get all category
//http://localhost:3001/api/category
router.get("", async (request, response) => {
    try {
        console.log("getting all users...");
        const users = await categoryLogic.getAllCategories();
        console.log("users has been sent...");
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//add category to DB
//http://localhost:3001/api/category
router.post("", async (request, response) => {
    try {
        const category = new CategoryModel(request.body);
        const addedCategory = await categoryLogic.addCategory(category);
        response.json(addedCategory);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;