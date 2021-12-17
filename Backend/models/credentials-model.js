const mongoose = require("mongoose");

const CredentialsSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    versionKey: false,
});

const CredentialsModel = mongoose.model("CredentialsModel", CredentialsSchema, "credentials");

module.exports = CredentialsModel;