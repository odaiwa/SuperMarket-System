global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const userController = require("./controllers-layer/user-controller");
const categoryController = require("./controllers-layer/category-controller");
const itemController = require("./controllers-layer/items-controller");
const authController = require("./controllers-layer/auth-controller");
const productsController = require("./controllers-layer/products-controller");
const ordersController = require("./controllers-layer/orders-controller");
const expressFileUpload = require("express-fileupload");
const cartsController = require("./controllers-layer/carts-controller");

const server = express();
server.use(expressFileUpload());
server.use(express.json());
server.use(cors());

server.use("/", userController);
server.use("/api/category", categoryController);
server.use("/api/items", itemController);
server.use("/api/auth", authController);
server.use("/api/products", productsController);
server.use("/api/orders", ordersController);
server.use("/api/carts", cartsController);

server.use("*", (req, res) => res.status(404).send("Route not found"));

const port = process.env.PORT || 3001; //process.env.PORT === Some production port || 3001 === localhost port
const listener = server.listen(port, () => console.log(`Listening to ${port}...`));