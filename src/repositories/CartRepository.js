const Cart = require("../models/cart");
const CartRepository = {
  async getCartByCustomerId(customerId) {
    
    return await Cart.findOne({ customer_id: customerId }).populate(
      "items.product_id"
    );
  },

  async createCart(customerId) {
    try {
      const newCart = await Cart.create({ customer_id: customerId, items: [] });
      return newCart;
    } catch (error) {
      throw new Error("đã xảy ra lỗi khi tạo cart");
    }
  },

  async updateCart(cart) {
    return await cart.save();
  },

  async clearCart(customerId) {
    return await Cart.findOneAndUpdate(
      { customer_id: customerId },
      { items: [], totalPrice: 0, discount: 0, finalPrice: 0 },
      { new: true }
    );
  },
};

module.exports = CartRepository;
