const DarftOrderRepository = require("../repositories/draftOrderRepository");
const CustomerRepository = require("../repositories/customerRepository");
const CartRepository = require("../repositories/cartRepository");
const PromotionRepository = require("../repositories/promotionRepository");

const DraftOrderService = {
  // async creatDraftOrder(customerId) {
  //   let cart = await CartRepository.getCartByCustomerId(customerId);
  //   if (!cart) throw new Error("Cart not found");
  //   let discount = 0;
  //   let description = "";
  //   const customer = await CustomerRepository.findById(customerId);
  //   if (customer.point < 100) {
  //     discount = cart.finalPrice * 0.05;
  //     description = "Discount 5% for silver customer";
  //   } else if (customer.point < 200) {
  //     discount = cart.finalPrice * 0.1;
  //     description = "Discount 10% for gold customer";
  //   } else {
  //     discount = cart.finalPrice * 0.15;
  //     description = "Discount 15% for platinum customer";
  //   }

  //   const finalPrice = cart.finalPrice - discount;

  //   const newDraftOrder = await DarftOrderRepository.createDraftOrder({
  //     customer_id: customerId,
  //     items: cart.items,
  //     totalPrice: cart.finalPrice,
  //     discount: discount,
  //     description: description,
  //     amountPrice: finalPrice,
  //     finalPrice: finalPrice,
  //   });
  //   return newDraftOrder;
  // },
  async getDraftOrderByCustomerId(customerId) {
    return await DarftOrderRepository.getDraftOrderByCustomerId(customerId);
  },

  async clearDraftOrder(customerId) {
    return await DarftOrderRepository.clearDraftOrder(customerId);
  },
  async deleteDraftOrder(customerId) {
    return await DarftOrderRepository.deleteOrderCard(customerId);
  },
  async applyPromotion(promocode) {
    const promotion = await PromotionRepository.getByCode(promocode);
    if (!promotion) throw new Error("Invalid promotion code");

    const now = new Date();
    if (promotion.start_date > now || promotion.end_date < now) {
      throw new Error("Promotion is not valid at this time");
    }

    return promotion;
  },
};

module.exports = DraftOrderService;
