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
      res.status(200).json(updatedCart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  async updateQuantity(req, res) {
    try {
      const { customerId, productId, quantity } = req.body;
      const updatedCart = await CartService.updateQuantity(
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
      const cart = await CartService.getCart(req.params.customerId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async removeItem(req, res) {
    try {
      const { customerId, productId } = req.query;

      const updatedCart = await CartService.removeItem(customerId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async applyPromotion(req, res) {
    try {
      const { promoCode } = req.body;
      const updatedCart = await CartService.applyPromotion(promoCode);
      res.json(updatedCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
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
