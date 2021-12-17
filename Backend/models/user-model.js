const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        required: [true, "id required"]
    },
    firstName: {
        type: String,
        minlength: [2, 'first name must be at least 2 chars']
    },
    lastName: {
        type: String,
        minlength: [2, "last name must be at least 2 chars"]
    },
    email: {
        type: String,
        match: [/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/, 'email must be in form example@example.xyz']
    },
    password: {
        type: String,
        minlength: [6, "password must be at least 6 chars"]
    },
    address: {
        city: String,
        street: String
    },
    isAdmin: Number,
}, {
    versionKey: false,
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;