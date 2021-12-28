const mongoose = require("mongoose");
  
const ItemSchema = mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    totalPrice: {
        type: Number,
        required: true,
    },

    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
    },

 
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

ItemSchema.virtual("product", {
    ref: "ProductModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

ItemSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const ItemModel = mongoose.model("ItemModel", ItemSchema, "items");

module.exports = ItemModel;