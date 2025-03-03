const OrderRepository = require("../repositories/orderRepository");
const CartRepository = require("../repositories/cartRepository");
const ShippingRepository = require("../repositories/shippingRepository");
const stripe = require("../config/stripe");
const CustomerRepository = require("../repositories/customerRepository");
const ProductRepository = require("../repositories/productRepository");

const productRepository = require("../repositories/productRepository");
const OrderService = {
  async createOrder(customerId, payment_method, address, phone, totalPay) {
    try {
      const location = `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;
      let cart = await CartRepository.getCartByCustomerId(customerId);
      if (!cart) throw new Error("Cart not found");

      await ProductRepository.checkStockAvailability(cart.items);

      let newOrder = await OrderRepository.createOrder({
        customer_id: customerId,
        items: cart.items,
        totalPay,
        payment_method: payment_method,
      });

      let newShipping = await ShippingRepository.createShipping({
        order_id: newOrder._id,
        shippingdata: {
          address: location,
          phone: phone,
          status: "Pending",
        },
      });

      if (!newOrder._id) {
        throw new Error("Missing order_id");
      }

      let checkoutUrl = null;

      if (payment_method === "stripe") {
        if (!stripe) throw new Error("Stripe is not initialized");

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "vnd",
                product_data: { name: "Total Payment" },
                unit_amount: totalPay, // Ensure totalAmount is in VND
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:5173/success`,
          cancel_url: `http://localhost:5173/cancel`,
          metadata: {
            order_id: newOrder._id.toString(),
            shipping_id: newShipping._id.toString(),
          },
        });

        checkoutUrl = session.url;
      }

      // Stock & Points should be updated regardless of payment method
      await ProductRepository.updateStockAndPurchaseCount(newOrder.items);
      await CustomerRepository.updatePoint(customerId, newOrder.totalPay);
      await CartRepository.clearCart(customerId);

      return {
        message: "Created order successfully",
        data: { Url: checkoutUrl, order: newOrder, shipping: newShipping },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getOrderById(id) {
    try {
      const order = await OrderRepository.getOrderById(id);
      if (!order) {
        throw new Error("order not found");
      }
      return { message: "get order success", data: order };
    } catch (error) {
      throw new Error(error.message);
    }
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
