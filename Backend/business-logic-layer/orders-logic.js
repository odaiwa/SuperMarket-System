const OrderModel = require("../models/orders-model");

function getAllOrdersAsync() {
    return OrderModel.find().exec();
}

function getLastOrderAsync(userId) {
    return OrderModel.findOne({ userId }).sort({ initDate: 'desc' }).populate("user").populate("cart").exec();
}

function addOrderAsync(order) {
    return order.save();
}

module.exports = {
    getAllOrdersAsync,
    getLastOrderAsync,
    addOrderAsync
}