const express = require("express");
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const question = require("./question");
const promotion = require("./promotion");
const cart = require("./cart");
const draftOrder = require("./draftOrder");
const order = require("./order");
const shipping = require("./shipping");
const review = require("./review");
const blog = require("./blog");
const routine = require("./routine");
const shipFee = require("./shipFee");
const address = require("./address");
const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/users", user);
router.use("/questions", question);
router.use("/cart", cart);
router.use("/promotions",promotion)
router.use("/draftOrders", draftOrder);
router.use("/orders", order);
router.use("/shippings", shipping);
router.use("/reviews", review);
router.use("/blogs", blog);
router.use("/routines", routine);
router.use("/shipfees",shipFee);
router.use("/address",address);

module.exports = router;
