const express = require("express");
const OrderModel = require("../models/orders-model");
const logic = require("../business-logic-layer/orders-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.get("/orders/", async (request, response) => {
    try {

        console.log("orders");

        const orders = await logic.getAllOrdersAsync();
        console.log(orders.length);
        response.json(orders);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/orders/:_id", verifyLoggedIn, async (request, response) => {
    try {
        const _id = request.params._id;
        const latestOrder = await logic.getLastOrderAsync(_id);
        response.json(latestOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.post("/orders", verifyLoggedIn, async (request, response) => {
    try {
        const order = new OrderModel(request.body);
        // Validate: 
        const errors = await order.validateSync();
        if(errors) return response.status(400).send(errors.message);

        const addedOrder = await logic.addOrderAsync(order);
        response.status(201).json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;
