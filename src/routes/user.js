const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const userController = require("../controllers/userController");

const router = express.Router();

//admin
router.put("/customer/:customerId", userController.updateCustomer);
router.get("/customer/:customerId", userController.GetCustomerIdByUserId);
router.get("/staff",userController.getAllStaff);
router.get("/customer", userController.getAllCustomer);




router.get("/:userId", userController.getCustomerById);
router.put("/update/:id", userController.updateUserById);

//admin

router.post("/create-employee", checkAdmin, userController.createEmployee);
router.put("/delete/:id", checkAdmin, userController.deleteUserById);



module.exports = router;
