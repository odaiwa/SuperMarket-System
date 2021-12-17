const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/products-model");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const path = require("path");
const fs = require('fs');
const router = express.Router();

//https:localhost:3001/api/products
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//https:localhost:3001/api/products/_id
router.get("/:id", verifyLoggedIn, async (request, response) => {
    try {
        const id = request.params.id;
        const product = await productsLogic.getProductAsync(id);
        if (!product) return response.status(404).send(`_id ${_id} not found`);
        response.json(product);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
//https:localhost:3001/api/prod-category/_categoryId
router.get("/prod-category/:categoryId", verifyLoggedIn, async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const products = await productsLogic.getProductsByCategoryAsync(categoryId);
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
//https:localhost:3001/api/products
router.post("/", async (request, response) => {
    try {
        console.log(request.body)
        if (!request.files.img) return response.status(400).send("No Image sent");
        
        const product = new ProductModel(request.body);

        const errors = await product.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedProduct = await productsLogic.addProductAsync(product, request.files ? request.files.image : null);
        response.status(201).json(addedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//https:localhost:3001/api/products/_id
router.delete("/:id", verifyAdmin, async (request, response) => {
    try {
        const id = request.params.id;
        const deletedProduct = await productsLogic.deleteProductAsync(id);
        if (!deletedProduct) return response.status(404).send(`_id ${_id} not found`);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//https:localhost:3001/api/products/_id
router.patch("/:_id", verifyAdmin, async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const productToUpdate = new ProductModel(request.body);

        const errors = await productToUpdate.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const updatedProduct = await productsLogic.updateProductAsync(productToUpdate, request.files ? request.files.image : null);
        if (!updatedProduct) return response.status(404).send(`_id ${_id} not found`);
        response.json(updatedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

//https:localhost:3001/api/products/images/_name
router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;
        let fullPath = path.join(__dirname, "..", "images", name);
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(__dirname, "..", "images", "ImageNotFound.png");
        }
        response.sendFile(fullPath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;