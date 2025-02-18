const express = require("express");
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const question = require("./question");
const promotion = require("./promotion");
const cart = require("./cart");
const draftOrder = require("./draftOrder");
const order = require("./order");
const version = require("./version");
const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/users", user);
router.use("/questions", question);
router.use("/cart", cart);
router.use("/promotions", promotion);
router.use("/draftOrders", draftOrder);
router.use("/orders", order);
router.use("/version", version);

module.exports = router;
