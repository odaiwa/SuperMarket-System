const fs = require("fs");
const { getError } = require("./errors-helper");
//Manage file Upload:
function safeDelete(absolutePath) {
    try {
        if(!absolutePath || !fs.existsSync(absolutePath)) return;
        fs.unlinkSync(absolutePath);
    }
    catch(err) {
        getError(err);
    }
}

module.exports = {
    safeDelete
};