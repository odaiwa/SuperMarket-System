const dal = require("../data-access-layer/dal");
const UserModel = require("../models/user-model");


function getAllUsers() {
    return UserModel.find().exec();
}

function getUserById(_id){
    return UserModel.findById(_id).exec();
}


function addUser(user) {
    return user.save();
}

module.exports = {
    getAllUsers,
    addUser,
    getUserById
};