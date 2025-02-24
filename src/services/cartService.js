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
    if(product.discountPercentage > 0){
      priceAtTime = product.discountedPrice ;
    } else{
      priceAtTime = product.price;
    }
    const existingItem = cart.items.find(item => item.product_id.equals(productId));

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
    cart.finalPrice = cart.totalPrice - cart.discount;

    return await CartRepository.updateCart(cart);
  },

  async removeItem(customerId, productId) {
    let cart = await CartRepository.getCartByCustomerId(customerId);
    if (!cart) throw new Error("Cart not found");

    const itemIndex = cart.items.findIndex((item) =>
      item.product_id.equals(productId)
    );
    if (itemIndex < 0) throw new Error("Product not found in cart");

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

  // async applyPromotion(customerId, promoCode) {
  //   let cart = await CartRepository.getCartByCustomerId(customerId);
  //   if (!cart) throw new Error("Cart not found");

  //   const promotion = await PromotionRepository.getByCode(promoCode);
  //   if (!promotion) throw new Error("Invalid promotion code");

  //   const now = new Date();
  //   if (promotion.start_date > now || promotion.end_date < now) {
  //     throw new Error("Promotion is not valid at this time");
  //   }

  //   // Tính giảm giá
  //   cart.discount = (cart.totalPrice * promotion.discount_percentage) / 100;
  //   cart.finalPrice = Math.max(cart.totalPrice - cart.discount, 0);

  //   return await CartRepository.updateCart(cart);
  // },

  async getCart(customerId) {
    return await CartRepository.getCartByCustomerId(customerId);
  },

  async clearCart(customerId) {
    return await CartRepository.clearCart(customerId);
  },
};

module.exports = CartService;
