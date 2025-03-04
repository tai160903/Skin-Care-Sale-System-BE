const express = require("express");
const ShippingController = require("../controllers/shippingController");

const router = express.Router();

router.get("/customer/:customerId", ShippingController.getShippingByCustomerId);
router.get('/customer-status/:customerId/:status', ShippingController.getShippingByCustomerAndStatus);
router.put("/update-status/:id", ShippingController.updateStatusShipping);
router.put("/update-reason/:id", ShippingController.updateReasonShipping);
router.get("/status/:status", ShippingController.getShippingByStatus);
router.get("/order/:order_id", ShippingController.getShippingByOrderId);

router.get("/", ShippingController.getAllShipping);

module.exports = router;
