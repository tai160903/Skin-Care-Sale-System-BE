const OrderController = require('../controllers/orderController');

const router = require('express').Router();

router.post('/create', OrderController.createOrder);

module.exports = router;