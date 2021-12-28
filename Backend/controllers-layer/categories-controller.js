const express = require("express");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const logic = require("../business-logic/categories-logic");


const router = express.Router();
router.use(verifyLoggedIn);

router.get("/", async (request, response) => {
    try {
        const categories = await logic.getAllCategoriesAsync();
        response.json(categories);
    } catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;