const OrderController = require('../controllers/orderController');

const router = require('express').Router();

router.post('/create', OrderController.createOrder);
router.delete("/:id", OrderController.deleteOrder)
router.get("/",OrderController.getAllOrder)
router.get("/customer/:customerId",OrderController.getOrdersByCustomerId)
router.put("/:id", OrderController.updateOrderStatus)
router.get("/:id",OrderController.getOrderById)
module.exports = router;