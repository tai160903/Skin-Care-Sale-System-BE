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
    async getAllOrders(filter = {}, { page, limit }) {
        try {
            const query = {};
    
            if (filter.order_status) {
                query.order_status = { $in: filter.order_status }; 
            }
            if (filter.customer_id) {
                query.customer_id = filter.customer_id;
            }
    
            const totalItems = await Order.countDocuments(query);
            const orders = await Order.find(query)
                .populate('items.product_id')
                .limit(limit)
                .skip((page - 1) * limit);
    
            return {
                totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
                data: orders
            };
        } catch (error) {
            console.error("Error fetching all orders:", error);
            throw error;
        }
    },    

    async updateStatusOrder(id,status){
         
        await this.getOrderById(id);
        return await Order.findByIdAndUpdate(id,{order_status : status},{new:true});
    },

}
module.exports = OrderRepository;