const ItemModel = require("../models/items-model");
const CategoryModel = require("../models/category-model");

function getAllItems(){
    return ItemModel.find().populate("category").exec();
}

function getItemById(_id) {
    return ItemModel.findById(_id).exec();
}


function addItem(item) {
    return item.save(); // save returns a promise
}


module.exports={
    addItem,
    getAllItems,
    getItemById
}