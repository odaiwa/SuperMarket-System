const dal = require("../data-access-layer/dal");
const uuid = require("uuid");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
const jwtHelper = require("../helpers/jwt-helper");
const CredentialsModel = require("../models/credentials-model");


function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    console.log(user);
    // user.isAdmin=0;
    delete user.password;
    user.token = jwtHelper.getNewToken(user);
    return user.save();
}

function userLoginAsync(email, password) {
    //password = cryptoHelper.hash(password);
    const user = UserModel.findOne({ email, password }).exec();
    if (user.length === 0) return null;
    user.token = jwtHelper.getNewToken(user);
    return user;
}

function validateUserIdAsync(userId) {
    const user = UserModel.find({ userId }).exec();
    return !user ? true:false;
} 

module.exports = {
    registerAsync,
    userLoginAsync,
    validateUserIdAsync
}