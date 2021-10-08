const CategoryModel = require("../models/category-model");

function getAllCategories() {
    return CategoryModel.find().exec();
}


function addCategory(category) {
    return category.save();
}

module.exports = {
    getAllCategories,
    addCategory
}