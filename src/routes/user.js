const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const userController = require("../controllers/userController");

const router = express.Router();

//user
router.get("/:id", userController.getUserById);
router.put("/update/:id", userController.updateUserById);

//admin
router.get("/", checkAdmin, userController.getAllUsers);
router.put("/delete/:id", checkAdmin, userController.deleteUserById);

module.exports = router;
