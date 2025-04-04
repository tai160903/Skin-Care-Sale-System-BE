const Order = require("../models/order");

const OrderRepository = {
  // get all order of customer

  async countDocuments() {
    return await Order.countDocuments();
  },

  async createOrder(orderData) {
    return await Order.create(orderData);
  },
  async getOrderById(orderId) {
    const order = await Order.findById(orderId).populate("items.product_id");
    if (!order) {
      throw new Error("không tìm thấy đơn hàng");
    }
    return order;
  },
  async deleteOrderById(orderId) {
    await this.getOrderById(orderId);
    return await Order.findByIdAndDelete(orderId);
  },
  // get all order
  async getAllOrders(filter = {}, options = {}) {
    return await Order.find(filter)
      .skip(options.page * options.limit - options.limit)
      .limit(options.limit)
      .sort(options.sortBy)
      .populate(options.populate);
  },
  async getOrdersByCustomerId(customerId) {

    const orders = await Order.find({ customer_id: customerId }).populate('items.product_id');
    if(!orders){
        throw new Error("không tìm thấy đơn hàng");
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
  },
};
module.exports = OrderRepository;
