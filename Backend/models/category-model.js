const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    categoryName: String
}, {
    versionKey: false
});

CategorySchema.virtual("products", {
    ref: "ProductModel",
    localField: "_id",
    foreignField: "categoryId"
});

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;