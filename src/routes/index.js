const express = require("express");
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const promotion = require("./promotion");
const cart = require("./cart"); 

const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/users", user);
router.use("/cart", cart);
router.use("/promotions",promotion)

module.exports = router;
