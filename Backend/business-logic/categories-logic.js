
const CategoryModel = require("../models/category-model");

function getAllCategoriesAsync() {
    return CategoryModel.find().exec();
}

module.exports = {
    getAllCategoriesAsync
}