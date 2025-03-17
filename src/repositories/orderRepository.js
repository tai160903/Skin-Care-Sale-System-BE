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
    return await Order.paginate(filter, options);
  },

  async updateStatusOrder(id, status) {
    await this.getOrderById(id);
    return await Order.findByIdAndUpdate(
      id,
      { order_status: status },
      { new: true }
    );
  },
};
module.exports = OrderRepository;
