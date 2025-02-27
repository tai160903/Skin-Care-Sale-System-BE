const OrderRepository = require("../repositories/orderRepository");
const CartRepository = require("../repositories/cartRepository");
const ShippingRepository = require("../repositories/shippingRepository");
const stripe = require("../config/stripe");
const CustomerRepository = require("../repositories/customerRepository");
const ProductRepository = require("../repositories/productRepository");

const productRepository = require("../repositories/productRepository");
const OrderService = {
  async createOrder(customerId, payment_method, address, phone) {
    let cart = await CartRepository.getCartByCustomerId(customerId);
    if (!cart) throw new Error("Cart not found");

    await ProductRepository.checkStockAvailability(cart.items);

    const shipfee = await ShipFeeService.GetShipFeeByLocation(address);

    let newOrder = await OrderRepository.createOrder({
      customer_id: customerId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      discount: cart.discount,
      finalPrice: cart.finalPrice,
      payment_method: payment_method,
      payment_status: "Pending Confirmation",
      totalPay: cart.finalPrice + shipfee.shiping_price,
      shipping_fee: shipfee.shiping_price,
    });

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
                unit_amount: Math.round(newOrder.totalPay * 100),
                // Chuyển sang cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:5173/success?orderId=${newOrder._id}`,
          cancel_url: `http://localhost:5173/cancel?orderId=${newOrder._id}`,

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

    // if (payment_method === "PayPal") {
    //   try {
    //     const session = await stripe.checkout.sessions.create({
    //       payment_method_types: ["card"],
    //       line_items: [
    //         {
    //           price_data: {
    //             currency: "usd",
    //             product_data: {
    //               name: "Total Payment",
    //             },
    //             unit_amount: Math.round(
    //               (draftOrder.finalPrice + shipfee.price) * 100
    //             ),
    //             // Chuyển sang cents
    //           },
    //           quantity: 1,
    //         },
    //       ],
    //       mode: "payment",
    //       success_url: `http://localhost:5173/success?orderId=${newOrder._id}`,
    //       cancel_url: `http://localhost:5173/cancel?orderId=${newOrder._id}`,

    //       metadata: {
    //         order_id: newOrder._id.toString(),
    //         shipping_id: newShipping._id.toString(),
    //       },
    //     });
    await ProductRepository.updateStockAndPurchaseCount(newOrder.items);
    await CustomerRepository.updatePoint(customerId, newOrder.finalPrice);
    // Xóa giỏ hàng và draft order
    await CartRepository.clearCart(customerId);
    // await DraftOrderService.deleteDraftOrder(customerId);

    return { newOrder, checkoutUrl }; // Trả về đơn hàng và link thanh toán (nếu có)
  },
  async getOrderById(id) {
    const order = await OrderRepository.getOrderById(id);
    if (!order) {
      throw new Error("order not found");
    }
    return order;
  },
  async deleteOrderById(id) {
    const order = await this.getOrderById(id);

    await productRepository.restoreStockAndPurchaseCount(order.items);

    return await OrderRepository.deleteOrderById(id);
  },
  async getAllOrder() {
    return await OrderRepository.getAllOrders();
  },
  async getOrdersByCustomerId(customerId) {
    console.log(customerId);
    return await OrderRepository.getOrdersByCustomerId(customerId);
  },
  async updateStatusOrder(id, status) {
    const order = await OrderRepository.getOrderById(id);
    if (status == "Cancelled") {
      await productRepository.restoreStockAndPurchaseCount(order.items);
    }
    if (order.order_status == "Cancelled") {
      throw new Error("this Order cancelled, it can't not update status ");
    }
    return await OrderRepository.updateStatusOrder(id, status);
  },
};

module.exports = OrderService;
