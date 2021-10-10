const mongoose = require("mongoose");

const CredentialsSchema = mongoose.Schema({
    username: String,
    password: String,
}, {
    versionKey: false,
    // _id: false
});

const CredentialsModel = mongoose.model("CredentialsModel", CredentialsSchema, "users");

module.exports = CredentialsModel;