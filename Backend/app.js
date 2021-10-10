global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const server = express();
const userController = require("./controllers-layer/user-controller");
const categoryController = require("./controllers-layer/category-controller");
const itemController = require("./controllers-layer/item-controller");
const authController = require("./controllers-layer/auth-controller");
server.use(express.json());
server.use(cors());

server.use("/", userController);
server.use("/api/category", categoryController);
server.use("/api/items", itemController);
server.use("/api/auth", authController);



const port = process.env.PORT || 3001; //process.env.PORT === Some production port || 3001 === localhost port
const listener = server.listen(port, () => console.log(`Listening to ${port}...`));