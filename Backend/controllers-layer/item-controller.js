const express = require("express");
const logic = require("../business-logic-layer/item-logic");
const ItemModel = require("../models/items-model");
const router = express.Router();


router.get("/", async (request, response) => {
    try {
        const items = await logic.getAllItems();
        response.json(items);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});


router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const item = await logic.getIteById(_id);
        if(!item) return response.status(404).send(`_id ${_id} not found`);
        response.json(item);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

// POST new product: http://localhost:3001/api/items
router.post("/", async (request, response) => {
    try {
        const item = new ItemModel(request.body);

        // Validate: 
        const errors = await item.validateSync();
        if(errors) return response.status(400).send(errors.message);

        const addedItem = await logic.addItem(item);
        response.status(201).json(addedItem);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;