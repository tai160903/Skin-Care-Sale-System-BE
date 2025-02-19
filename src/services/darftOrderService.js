const DarftOrderRepository = require("../repositories/draftOrderRepository");
const CustomerRepository = require("../repositories/customerRepository");
const CartRepository = require("../repositories/CartRepository");

const DraftOrderService = {
    async creatDraftOrder(customerId) {
    let cart = await CartRepository.getCartByCustomerId(customerId);
    if (!cart) throw new Error("Cart not found");
    let discount = 0;
    let description = "";
    const customer = await CustomerRepository.findById(customerId);
    if(customer.point < 100 ){
        discount = cart.finalPrice * 0.05;
        description = "Discount 5% for silver customer";
    } else if(customer.point < 200){
        discount = cart.finalPrice * 0.1;
        description = "Discount 10% for gold customer";
    } else {
        discount = cart.finalPrice * 0.15;
        description = "Discount 15% for platinum customer";
    }
    const finalPrice = cart.finalPrice - discount;

    const newDraftOrder = await DarftOrderRepository.createDraftOrder({
        customer_id: customerId,
        items : cart.items,
        totalPrice: cart.finalPrice,
        discount : discount,
        description: description,
        finalPrice: finalPrice,
    });
    return newDraftOrder;
},
    async getDraftOrderByCustomerId(customerId) {
    return await DarftOrderRepository.getDraftOrderByCustomerId(customerId);
    },

    async clearDraftOrder(customerId) {
    return await DarftOrderRepository.clearDraftOrder(customerId);
},
    async deleteDraftOrder(customerId){
        return await DarftOrderRepository.deleteOrderCard(customerId);
    }
};
module.exports = DraftOrderService;