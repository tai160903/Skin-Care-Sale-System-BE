const Order = require('../models/order');

const OrderRepository = {
    async getOrdersByCustomerId(customerId) {
        return await Order.find({ customer_id: customerId }).populate('items.product_id');
    },
    async createOrder(orderData) {
        return await Order.create(orderData);
    },
    async getOrderById(orderId) {
        return await Order.findById(orderId).populate('items.product_id');
    },
    async deleteOrderById(orderId) {
        return await Order.findByIdAndDelete(orderId);
    }
}
module.exports = OrderRepository;