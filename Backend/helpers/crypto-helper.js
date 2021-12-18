const crypto = require("crypto");
const { config } = require("process");

function hash(plainText) {
    if (!plainText) return null;
    const salt = "5AlTF0rPas2w0Rd";
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}


module.exports = {
    hash
};
