const Order = require('../models/order');

const OrderRepository = {
    async getOrdersByCustomerId(customerId) {
        return await Order.find({ customer_id: customerId }).populate('items.product_id');
    },
    async createOrder(orderData) {
        return await Order.create(orderData);
    },
}
module.exports = OrderRepository;