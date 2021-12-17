const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: [true, "price required"],
        min: [0, "no negative prices are allowed"],
    },
    city: {
        type: String,
        required: [true, "city required"]
    },
    street: {
        type: String,
        required: [true, "street required"]
    },
    deliveryDate: {
        type: Date,
        min: new Date(Date.now()).getDate() + 1,
        required: [true, "Shipping Date required"]
    },
    initDate: {
        type: Date,
        default: Date.now,
    },
    creditCard: {
        type: String,
        required: [true, "Credit Card Number required"]

    }

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

OrderSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;