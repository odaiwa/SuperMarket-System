const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    // _id:mongoose.Types.ObjectId,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    address: {
        city: String,
        street: String
    },
    isAdmin: Number,
    userId:String
}, {
    versionKey: false,
    // _id: false
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;