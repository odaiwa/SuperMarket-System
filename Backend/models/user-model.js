const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username:String,
    password:String,
    address:{
        city:String,
        street:String
    }
}, { versionKey: false });

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
