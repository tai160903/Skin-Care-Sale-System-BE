const express = require("express");
const auth = require("./auth");
const product = require("./product")

const router = express.Router();

router.use("/auth", auth);
router.use("/products", product);


module.exports = router;
