const express = require("express");
const ShippingController = require("../controllers/shippingController");

const router = express.Router();

router.get("/customer/:customerId", ShippingController.getShippingByCustomerId);
router.put("/update-status/:id", ShippingController.updateStatusShipping);
router.put("/update-reason/:id", ShippingController.updateReasonShipping);
router.get("/:id", ShippingController.getShippingById);
router.get("/", ShippingController.getAllShipping);

module.exports = router;
