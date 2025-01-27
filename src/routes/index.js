const express = require("express");
const auth = require("./auth");
const product = require("./product");
const user = require("./user");

const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/users", user);

module.exports = router;
