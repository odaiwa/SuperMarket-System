const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const UserModel = require("../models/user-model");
const jwtHelper = require("../helpers/jwt-helper");


function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    console.log(user);
    delete user.password;
    user.token = jwtHelper.getNewToken(user);
    user.save();
    return user;
}

async function userLoginAsync(email, password) {
    let user = await UserModel.findOne({ email, password }).exec();
    if (user.length === 0) return null;
    user.token = jwtHelper.getNewToken(user);
    // let newToken = jwtHelper.getNewToken(user);
    console.log("user-login "+user.token);
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