const Cart = require("../models/cart")
const CartRepository = {
  async getCartByCustomerId(customerId) {
    return await Cart.findOne({ customer_id: customerId }).populate("items.product_id");
  },

  async createCart(customerId) {
    try {
       // console.log("Creating cart for customer:", customerId);
        const newCart = await Cart.create({ customer_id: customerId, items: [] });
       // console.log("Cart created successfully:", newCart);
        return newCart;
    } catch (error) {
        throw new Error("Failed to create cart");
    }
 },


  async updateCart(cart) {
   console.log("Updating cart:", cart);
    return await cart.save();
  },

  async clearCart(customerId) {
    console.log("Clearing cart for customer:", customerId);
    return await Cart.findOneAndUpdate(
      { customer_id: customerId },
      { items: [], totalPrice: 0, discount: 0, finalPrice: 0 },
      { new: true }
    );
  }
};

module.exports = CartRepository;
