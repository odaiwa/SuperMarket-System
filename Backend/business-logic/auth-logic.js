const UserModel = require("../models/user-model");


function registerAsync(user) {
    const newUser = user.save();
    return newUser;
}

function validateIdAsync(id) {
    const user = UserModel.find({ id }).exec();
    if(!user) return true;
    return false;
}     

function loginAsync(email, password) {
    const user = UserModel.findOne({ email, password }).exec();
    if (user.length === 0) return null;
    return user;
}    



module.exports = {
    validateIdAsync,
    registerAsync,
    loginAsync
};