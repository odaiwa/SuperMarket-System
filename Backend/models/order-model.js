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
        required: true,
        min: 0, 
    },
    city: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true, 
    },
    street: {
        type: String,
        minLength: 2, 
        maxLength: 50,
        required: true
    },
    deliveryDate: {
        type: Date,
        min: new Date(Date.now()).getDate() + 1,
        required: true
    },
    initDate: {
        type: Date,
        default: Date.now,
    },
    creditCard: {
        type: String,
        minLength:6,
        maxLength: 6,
        required: true
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