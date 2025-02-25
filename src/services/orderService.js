const OrderRepository = require("../repositories/orderRepository");
const CartRepository = require("../repositories/cartRepository");
const DraftOrderService = require("./darftOrderService");
const ShippingRepository = require("../repositories/shippingRepository");
const stripe = require("../config/stripe");
const CustomerRepository = require("../repositories/customerRepository");

const ProductRepository = require("../repositories/productRepository");
const { applyPromotion } = require("./cartService");
const DarftOrderRepository = require("../repositories/draftOrderRepository");

const OrderService = {
  async createOrder(customerId, payment_method, address, phone) {
    let cart = await CartRepository.getCartByCustomerId(customerId);
    if (!cart) throw new Error("Cart not found");

    let draftOrder = await DraftOrderService.getDraftOrderByCustomerId(
      customerId
    );
    if (!draftOrder) throw new Error("Draft order not found");

    await ProductRepository.checkStockAvailability(draftOrder.items);

    const desc = draftOrder.desc + " and " + draftOrder.descriptions;
    const discount = draftOrder.discount + draftOrder.promoPrice;

    let newOrder = await OrderRepository.createOrder({
      customer_id: customerId,
      items: draftOrder.items,
      totalPrice: draftOrder.totalPrice,
      discount: discount,
      descriptions: desc,
      finalPrice: draftOrder.finalPrice,
      payment_method: payment_method,
      payment_status: "Pending",
    });
    console.log(newOrder);

    let newShipping = await ShippingRepository.createShipping({
      order_id: newOrder._id,
      shippingdata: {
        address: address,
        phone: phone,
        status: "Pending",
      },
    });

    let checkoutUrl = null;
    if (!newOrder._id || !newShipping._id) {
      throw new Error("Missing order_id or shipping_id");
    }
    if (payment_method === "PayPal") {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Total Payment",
                },
                unit_amount: Math.round(draftOrder.finalPrice * 100),
                // Chuyển sang cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:5173/success?orderId=${newOrder._id}`,
          cancel_url: "http://localhost:5173/cancel",
          metadata: {
            order_id: newOrder._id.toString(),
            shipping_id: newShipping._id.toString(),
          },
        });

        checkoutUrl = session.url; // Lưu URL thanh toán để gửi về FE
      } catch (error) {
        throw new Error(error.message);
      }
    }

    await ProductRepository.updateStockAndPurchaseCount(draftOrder.items);
    await CustomerRepository.updatePoint(customerId, draftOrder.finalPrice);
    // Xóa giỏ hàng và draft order
    await CartRepository.clearCart(customerId);
    await DraftOrderService.deleteDraftOrder(customerId);

    return { newOrder, newShipping, checkoutUrl }; // Trả về đơn hàng và link thanh toán (nếu có)
  },
  async getOrderById(id) {
    return await OrderRepository.getOrderById(id);
  },
  async deleteOrderById(id) {
    return await OrderRepository.deleteOrderById(id);
  },
};

module.exports = OrderService;
