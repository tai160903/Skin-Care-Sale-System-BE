const express = require("express");
const router = express.Router();
const skinTypeController = require("../controllers/skinTypeController");    

router.get("/", skinTypeController.GetAll);

module.exports = router;