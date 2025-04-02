const express = require("express");
const RestoreController = require("../controllers/restoreController");

const router = express.Router();

router.get("/customer/:customerId",RestoreController.getRestoreByCustomerId);

router.post("/",RestoreController.createRestore)
router.put("/:id",RestoreController.updateRestore);
router.get("/:id",RestoreController.getRestoreById)
router.get("/",RestoreController.getAllRestore);

module.exports = router;


