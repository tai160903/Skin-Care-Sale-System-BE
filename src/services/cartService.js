const CartRepository = require("../repositories/cartRepository");
const productRepository = require("../repositories/productRepository");
const PromotionRepository = require("../repositories/promotionRepository");

const CartService = {
  async addToCart(customerId, productId, quantity) {
    let cart = await CartRepository.getCartByCustomerId(customerId);
    if (!cart) {
      cart = await CartRepository.createCart(customerId);
    }

    const product = await productRepository.getProductById(productId);
   
    if (!product) throw new Error("Product not found");
    var priceAtTime = 0;
    if (product.discountPercentage > 0) {
      priceAtTime = product.price - (product.price * product.discountPercentage) / 100;
    } else {
      priceAtTime = product.price;
    }
    const existingItem = cart.items.find((item) =>
      item.product_id.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product_id: productId,
        quantity,
        priceAtTime: priceAtTime,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.priceAtTime,
      0
    );
    cart.finalPrice = cart.totalPrice - cart.discountpercent;

   
    return await CartRepository.updateCart(cart);
  },

  async updateQuantity(customerId, productId, quantity) {
    let cart = await CartRepository.getCartByCustomerId(customerId);
    if (!cart) throw new Error("không tim thấy giỏ hàng");

    const itemIndex = cart.items.findIndex((item) =>
      item.product_id.equals(productId)
    );
    if (itemIndex < 0) throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      // Nếu quantity = 1 thì xóa sản phẩm khỏi giỏ hàng
      cart.items.splice(itemIndex, 1);
    }

    // Cập nhật tổng tiền và giá cuối cùng
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.priceAtTime,
      0
    );
    cart.finalPrice = cart.totalPrice - cart.discount;

    return await CartRepository.updateCart(cart);
  },

  async removeItem(customerId, productId) {
    const cart = await CartRepository.getCartByCustomerId(customerId);
    if (!cart) throw new Error("không tìm thấy giỏ hàng");

    cart.items = cart.items.filter(
      (item) => item.product_id._id.toString() !== productId.toString()
    );

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.priceAtTime,
      0
    );
    cart.finalPrice = cart.totalPrice - (cart.discount || 0);

    const updatedCart = await CartRepository.updateCart(cart);

    return {
      cart: updatedCart,
      message: "đã xóa sản phẩm khỏi giỏ hàng"
    };
  },

  async applyPromotion(promoCode) {
    try {
      const promotion = await PromotionRepository.getByCode(promoCode);
      if (!promotion) throw new Error("mã giảm giá không hợp lệ");

  //    const now = new Date();
   //   if (promotion.start_date > now || promotion.end_date < now) {
    //    throw new Error("Promotion is not valid at this time");
   //   }

      return promotion;
    } catch (error) {
      throw new Error("Error applying promotion: " + error.message);
    }
  },

  async getCart(customerId) {
    const Cart = await CartRepository.getCartByCustomerId(customerId);
    if (!Cart) {
      await CartRepository.createCart(customerId);
    }
    return Cart;
  },

  async clearCart(customerId) {
    return await CartRepository.clearCart(customerId);
  },
};

module.exports = CartService;
