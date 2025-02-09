const express = require("express");
const auth = require("./auth");
const product = require("./product");
const user = require("./user");
const quiz = require("./quiz");

const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);
router.use("/users", user);
router.use("/quiz", quiz);

module.exports = router;
