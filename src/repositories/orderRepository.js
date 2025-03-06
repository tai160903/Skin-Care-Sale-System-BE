const Order = require('../models/order');

const OrderRepository = {
    // get all order of customer 
  
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
    async getAllOrders(filter = {}) {
        const query = {}; 
        if (filter.status) {
            query.order_status =  filter.status; 
        }
        if(filter.customer_id) {
            query.customer_id = filter.customer_id;
          }
        return await Order.find(query).populate('items.product_id');
    },

    async updateStatusOrder(id,status){
        await this.getOrderById(id);
        return await Order.findByIdAndUpdate(id,{order_status : status.order_status},{new:true});
    },

}
module.exports = OrderRepository;