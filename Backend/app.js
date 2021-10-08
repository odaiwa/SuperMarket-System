global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const server = express();
const userController = require("./controllers-layer/user-controller");
const categoryController = require("./controllers-layer/category-controller");
server.use(express.json());
server.use(cors());

server.use("/", userController);
server.use("/api/category", categoryController);



const port = process.env.PORT || 3001; //process.env.PORT === Some production port || 3001 === localhost port
const listener = server.listen(port, () => console.log(`Listening to ${port}...`));