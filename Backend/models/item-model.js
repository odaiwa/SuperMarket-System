const mongoose = require("mongoose");


const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "missing name"],
        minlength: [2, "Name must be minimum two chars."],
        maxlength: [100, "Name can't exceed 100 chars."]
    },

    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price can't be negative."],
        max: [10000, "Price can't exceed 10,000."]
    },

    categoryId: mongoose.Schema.Types.ObjectId // This field exists in the database
}, {
    versionKey: false, // Don't add a "__v" field to added documents.
    toJSON: { virtuals: true }, // Fill virtual fields when converting the model into JSON.
    id: false // Don't add "id" field when populating virtual fields.
});


ItemSchema.virtual("category", {
    ref: "CategoryModel", // Foreign collection model
    localField: "categoryId", // Connection local field
    foreignField: "_id", // Connection remote field
    justOne: true // Create "category" field as a single object rather than array.
});

const ItemModel = mongoose.model("ItemModel", ItemSchema, "items"); // model, schema, collection

module.exports = ItemModel;