const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
    },

    name: {
        type: String,
        required: true, 
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },
 
    imageName: String

}, { versionKey: false, toJSON: { virtuals: true }, id: false });

ProductSchema.virtual("category", {
    ref: "CategoryModel",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;