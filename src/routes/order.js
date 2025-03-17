const OrderController = require('../controllers/orderController');
const express = require('express');
const router = require('express').Router();

router.post('/create', OrderController.createOrder);
router.post("/webhook",express.json(), OrderController.stripeWebhook);
router.delete("/:id", OrderController.deleteOrder)
router.get("/customer/:customerId",OrderController.getOrdersByCustomerId)
router.get("/",OrderController.getAllOrder)
router.put("/:id", OrderController.updateOrderStatus)
router.get("/:orderId",OrderController.getOrderById)

module.exports = router;