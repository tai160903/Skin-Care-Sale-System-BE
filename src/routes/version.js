const versionController = require("../controllers/version");

const express = require("express");
const router = express.Router();

router.get("/", versionController.getVersion);

module.exports = router;