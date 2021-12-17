const ProductModel = require("../models/products-model");
const CategoryModel = require("../models/category-model");
const path = require("path");
const uuid = require("uuid");

function getAllProductsAsync() {
    return ProductModel.find().populate("category").exec();
}

function getProductsByCategoryAsync(categoryId) {
    return ProductModel.find({
        categoryId
    }).exec();
}

function getProductAsync(productId) {
    return ProductModel.findOne({
        productId
    }).exec();
}


function deleteProductAsync(_id) {
    return ProductModel.findByIdAndDelete(_id).exec();
}

async function addProductAsync(product, image) {
    if (!image) return null;
    const imgExtension = image.name.substr(image.name.lastIndexOf("."));
    const newImageName = uuid.v4() + imgExtension;
    product.imageName = newImageName;
    const fullPath = path.join("./images/", product.imageName);
    await image.mv(fullPath);
    return product.save();
}

async function updateProductAsync(product, newImage) {

    if (newImage) {
        const extension = newImage.name.substr(newImage.name.lastIndexOf("."));
        const newFileName = uuid.v4() + extension;
        product.imageName = newFileName;
        fullPath = path.join("./images/", product.imageName);
        await newImage.mv(fullPath);
    }

    return ProductModel.findByIdAndUpdate(product._id, product, {
        returnOriginal: false
    }).exec();
}

module.exports = {
    getAllProductsAsync,
    getProductAsync,
    getProductsByCategoryAsync,
    addProductAsync,
    getAllCategoriesAsync,
    deleteProductAsync,
    updateProductAsync
}