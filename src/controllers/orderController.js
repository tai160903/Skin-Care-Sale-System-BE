const OrderService = require("../services/orderService");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CartRepository = require("../repositories/cartRepository");

const OrderController = {
  async createOrder(req, res) {
    try {
      const { customerId, payment_method, address, phone, discount ,totalPay } = req.body;
      if (!customerId || !payment_method || !address || !phone ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newOrder = await OrderService.createOrder(
        customerId,
        payment_method,
        address,
        phone,
        discount,
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
      const { status, customer_id } = req.query; // Lấy status từ query params
      let filter = {};

      if (customer_id) {
          filter.customer_id = customer_id;
      }
      
      if (status) {
          filter.status = Array.isArray(status) ? status : [status]; 
      }
      const orders = await OrderService.getAllOrders(filter);
      return res.status(200).json(orders);
  } catch (error) {
      return res.status(500).json({ message: error.message });
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
  async stripeWebhook(req, res) {
    const event = req.body; // Không cần JSON.parse()
    const session = event.data.object;
    if (event.type === "checkout.session.completed") {
      await CartRepository.clearCart(session.metadata.customer_id);
    } else {
      await OrderService.deleteOrderById(session.metadata.order_id);
    }
    res.status(200).json({ received: true });
  }
  

};

module.exports = OrderController;
