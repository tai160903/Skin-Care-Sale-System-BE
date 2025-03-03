const OrderService = require("../services/orderService");

const OrderController = {
  async createOrder(req, res) {
    try {
      const { customerId, payment_method, address, phone, totalPay } = req.body;
      if (!customerId || !payment_method || !address || !phone) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newOrder = await OrderService.createOrder(
        customerId,
        payment_method,
        address,
        phone,
        totalPay
      );
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async deleteOrder(req, res) {
    try {
      const deletedorder = await OrderService.deleteOrderById(req.params.id);
      if (!deletedorder) {
      }
      res.status(200).json({ message: "orderd deleted success" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async getAllOrder(req, res) {
    try {
      const orders = await OrderService.getAllOrder();
      res.status(200).json(orders);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async getOrdersByCustomerId(req, res) {
    try {
      const orders = await OrderService.getOrdersByCustomerId(
        req.params.customerId
      );
      res.status(200).json(orders);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  async updateOrderStatus(req, res) {
    try {
      const status = await OrderService.updateStatusOrder(
        req.params.id,
        req.body
      );
      res.status(200).json(status);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

module.exports = OrderController;
