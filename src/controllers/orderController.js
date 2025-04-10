const OrderService = require("../services/orderService");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CartRepository = require("../repositories/cartRepository");

const OrderController = {
  async createOrder(req, res) {
    try {
      const {
        customerId,
        payment_method,
        address,
        phone,
        name,
        discounted,
        totalPay,
        shipping_price,
        promotionId,
      } = req.body;
      if (!customerId || !payment_method || !address || !phone || !name) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newOrder = await OrderService.createOrder(
        customerId,
        payment_method,
        address,
        phone,
        name,
        discounted,
        totalPay,
        shipping_price,
        promotionId
      );
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: error.message });
    }
  },
  async deleteOrder(req, res) {
    try {
      const deletedorder = await OrderService.deleteOrderById(req.params.id);
      if (!deletedorder) {
      }
      res.status(200).json({ message: "orderd deleted success" });
    } catch (error) {
      console.error("Error deleting order:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async getAllOrder(req, res) {
    try {
      const result = await OrderService.getAllOrders(req.query);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async getOrderById(req, res) {
    try {
      const id = req.params.orderId;
      const order = await OrderService.getOrderById(id);
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
      const id = req.params.id;

      const { order_status } = req.body;
      const data = await OrderService.updateStatusOrder(id, order_status);
      res.status(200).json(data);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async stripeWebhook(req, res) {
    const event = req.body; // Không cần JSON.parse()
    const session = event.data.object;
    if (event.type === "checkout.session.completed") {
      await CartRepository.clearCart(session.metadata.customer_id);
    } else if (event.type === "checkout.session.expired") {
      await OrderService.deleteOrderById(session.metadata.order_id);
  }
    res.status(200).json({ received: true });
  },
};

module.exports = OrderController;
