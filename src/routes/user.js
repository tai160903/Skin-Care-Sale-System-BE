const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", checkAdmin, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/update/:id", userController.updateUserById);

module.exports = router;
