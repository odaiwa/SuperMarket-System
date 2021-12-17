const ProductModel = require("../models/products-model");
const CartModel = require("../models/carts-model");

function getAllCartsAsync() {
    return CartModel.find().exec();
}

function getOpenCartByUserIdAsync(userId, isPaid) {
    return CartModel.findOne({ userId, isPaid }).exec();
}

function getLatestCartAsync(userId) {
    return CartModel.findOne({ userId }).sort({ date: 'desc' }).exec();
}


function addCartAsync(cart) {
    return cart.save();
}

function updatePaidCartAsync(cart) {
    return CartModel.findByIdAndUpdate(cart._id, cart, { returnOriginal: false }).exec();
}

function deleteItemAsync(_id){
    return ProductModel.findByIdAndDelete(_id).exec();
}
module.exports = {
    getAllCartsAsync,
    getOpenCartByUserIdAsync,
    getLatestCartAsync,
    addCartAsync,
    updatePaidCartAsync,
    deleteItemAsync
}