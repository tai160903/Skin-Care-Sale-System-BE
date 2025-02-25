const CartService = require("../services/cartService");

const CartController = {
  async addToCart(req, res) {
    try {
      const { customerId, productId, quantity } = req.body;
      const updatedCart = await CartService.addToCart(
        customerId,
        productId,
        quantity
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getCart(req, res) {
    try {
      const { customerId } = req.params;
      const cart = await CartService.getCart(customerId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async removeItem(req, res) {
    try {
      const { customerId, productId } = req.query;

      const updatedCart = await CartService.removeItem(customerId, productId);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async applyPromotion(req, res) {
    try {
      const { customerId, promoCode } = req.body;
      const updatedCart = await CartService.applyPromotion(
        customerId,
        promoCode
      );
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async clearCart(req, res) {
    try {
      const { customerId } = req.query;
      await CartService.clearCart(customerId);
      res.json({ message: "Cart cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = CartController;
