const Order = require("../models/order");

const OrderRepository = {
  // get all order of customer

  async createOrder(orderData) {
    return await Order.create(orderData);
  },
  async getOrderById(orderId) {
    const order = await Order.findById(orderId).populate("items.product_id");
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  },
  async deleteOrderById(orderId) {
    await this.getOrderById(orderId);
    return await Order.findByIdAndDelete(orderId);
  },
  // get all order
  async getAllOrders(filter, options) {
    options.sort = { createdAt: -1 };

    const result = await Order.paginate(filter, options);

    
    result.docs = await Order.populate(result.docs, {
        path: "items.product_id",
        populate: { path: "category" }
    });

    return result;
},
  async getOrdersByCustomerId(customerId) {
    const orders = await Order.find({ customer_id: customerId }).populate('items.product_id');
    if(!orders){
        throw new Error("Orders not found");
    }
    return orders;  
},


  async updateStatusOrder(id, status) {
    await this.getOrderById(id);
    return await Order.findByIdAndUpdate(
      id,
      { order_status: status },
      { new: true }
    );
  },
  async countDocuments(filter) {
    return await Order.countDocuments(filter);
  }
};
module.exports = OrderRepository;
