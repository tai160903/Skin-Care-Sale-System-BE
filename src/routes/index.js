const express = require("express");
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const question = require("./question");
const promotion = require("./promotion");
<<<<<<< HEAD
const cart = require("./cart"); 
const draftOrder = require("./draftOrder");
const order = require("./order");
const version = require("./version");
=======
const cart = require("./cart");

>>>>>>> b1dc00c65fcc038d6de2ab6a5177e2395ea7e912
const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/users", user);
router.use("/questions", question);
router.use("/cart", cart);
<<<<<<< HEAD
router.use("/promotions",promotion)
router.use("/draftOrders", draftOrder);
router.use("/orders", order);
router.use("/version",version);
=======
router.use("/promotions", promotion);
>>>>>>> b1dc00c65fcc038d6de2ab6a5177e2395ea7e912

module.exports = router;
