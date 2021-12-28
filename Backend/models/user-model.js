const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true, 
        match: [/(?=.*[0-9])(?=.{9,})/, "password must contain at least 6 letters and numbers."]
    }, 
    firstName: {
        type: String,
        required: true, 
        minLength: 2,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true, 
        minLength: 2, 
        maxLength: 50
    },
    email: {
        type: String,
        required: true
    },
    password: {  
        type: String,
        required: true,
        minlength: 6,

    },
    address: {
        city: {
            type:String,
            required: true
        },
        street: {
            type:String,
            required:true
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: String

}, { versionKey: false });

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
