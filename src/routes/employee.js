const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const userController = require("../controllers/userController");

const router = express.Router();

//admin
router.post("/create-employee", checkAdmin, userController.createEmployee);
router.get("/", checkAdmin, userController.getAllUsers);
router.put("/delete/:id", checkAdmin, userController.deleteUserById);

module.exports = router;
