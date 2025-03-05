const Order = require('../models/order');

const OrderRepository = {
    // get all order of customer 
    async getOrdersByCustomerId(customerId) {
        const orders = await Order.find({ customer_id: customerId }).populate('items.product_id');
        if(!orders){
            throw new Error("Orders not found");
        }
        return orders;  
    },
    async createOrder(orderData) {
        return await Order.create(orderData);
    },
    async getOrderById(orderId) {
        const order = await Order.findById(orderId).populate('items.product_id');
        if(!order){
            throw new Error("Order not found");
        }
        return order;
    },
    async deleteOrderById(orderId) {
        await this.getOrderById(orderId);
        return await Order.findByIdAndDelete(orderId);
    },
    // get all order 
    async getAllOrders(){
        return await Order.find();
    },
    async updateStatusOrder(id,status){
        await this.getOrderById(id);
        return await Order.findByIdAndUpdate(id,{order_status : status.order_status},{new:true});
    },
    async getOrdersbyCustomerAndStatus(customerId,status){
        return await Order.find({customer_id : customerId,order_status : status}).populate('items.product_id');
    },

    async getOrdersByStatus(status){
        return await Order.find({order_status : status}).populate('items.product_id');
    },

}
module.exports = OrderRepository;