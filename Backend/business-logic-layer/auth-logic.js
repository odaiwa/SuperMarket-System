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

function userLoginAsync(username, password) {
    const user = UserModel.find({
        username,
        password
    }).exec();
    user.token = jwtHelper.getNewToken(user);
    delete user.password;
    console.log(user);
    return user;
}


module.exports = {
    registerAsync,
    userLoginAsync
}