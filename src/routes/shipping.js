const express = require("express");
const ShippingController = require("../controllers/shippingController");

const router = express.Router();

router.get("/", ShippingController.getAllShipping);
router.put("/update-status/:id", ShippingController.updateStatusShipping);
router.put("/update-reason/:id", ShippingController.updateReasonShipping);
router.get("/order/:order_id", ShippingController.getShippingByOrderId);

module.exports = router;
