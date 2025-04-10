const express = require("express");
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const question = require("./question");
const promotion = require("./promotion");
const cart = require("./cart");
const order = require("./order");
const shipping = require("./shipping");
const review = require("./review");
const blog = require("./blog");
const routine = require("./routine");
const shipFee = require("./shipFee");
const address = require("./address");
const dashboard = require("./dashboard");
const skinType = require("./skintype");
const category  = require("./category");
const restore = require("./restore");
const promotionCondition = require("./PromotionCondition")
const conditionPoint = require("./conditionPoint")
const router = express.Router();

router.use("/auth", auth);
router.use("/dashboard", dashboard);
router.use("/products", product);
router.use("/users", user);
router.use("/questions", question);
router.use("/cart", cart);
router.use("/categories", category);
router.use("/promotions", promotion);
router.use("/orders", order);
router.use("/shippings", shipping);
router.use("/reviews", review);
router.use("/blogs", blog);
router.use("/promotionConditions", promotionCondition);
router.use("/conditionPoints", conditionPoint);
router.use("/restore", restore)
router.use("/routines", routine);
router.use("/shipfees", shipFee);
router.use("/address", address);
router.use("/skintypes", skinType);

module.exports = router;
