const crypto = require("crypto");

function hash(plainText) {
    if (!plainText) return null;
    return crypto.createHash("sha512").update(plainText).digest("hex");
}

module.exports = {
    hash
};
