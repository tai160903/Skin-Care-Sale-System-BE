const OrderRepository = require("../repositories/orderRepository");
const CartRepository = require("../repositories/cartRepository");
const ShippingRepository = require("../repositories/shippingRepository");
const stripe = require("../config/stripe");
const CustomerRepository = require("../repositories/customerRepository");
const ProductRepository = require("../repositories/productRepository");
const ShippingService = require("../services/shippingService");
const productRepository = require("../repositories/productRepository");

const OrderService = {
  async createOrder(
    customerId,
    payment_method,
    address,
    phone,
    disscount,
    totalPay,
    shipping_price
  ) {
    try {
      let cart = await CartRepository.getCartByCustomerId(customerId);
      if (!cart) throw new Error("Cart not found");

      await ProductRepository.checkStockAvailability(cart.items);

      let newOrder = await OrderRepository.createOrder({
        customer_id: customerId,
        items: cart.items,
        totalPay: totalPay,
        discount: disscount,
        payment_method: payment_method,
        shipping_price: shipping_price,
      });

      let newShipping = await ShippingRepository.createShipping({
        order_id: newOrder._id,
        shippingdata: {
          customer_id: customerId,
          address: address,
          phone: phone,
          status: "Pending",
        },
      });

      let checkoutUrl = null;
      if (!newOrder._id) {
        throw new Error("Missing order_id ");
      }
      if (payment_method === "stripe") {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                product_data: { name: "Total Payment" },
                unit_amount: totalPay,
                currency: "vnd",
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
            customer_id: customerId.toString(),
          },
        });

        checkoutUrl = session.url; // Lưu URL thanh toán để gửi về FE
        await ProductRepository.updateStockAndPurchaseCount(newOrder.items);
        await CustomerRepository.updatePoint(customerId, newOrder.totalPay);
        return {
          messase: "created Order succees",
          data: { Url: checkoutUrl, order: newOrder, shipping: newShipping },
        };
      } else {
        await ProductRepository.updateStockAndPurchaseCount(newOrder.items);
        await CustomerRepository.updatePoint(customerId, newOrder.totalPay);
        await CartRepository.clearCart(customerId);
        return {
          messase: "created Order succees",
          data: { order: newOrder, shipping: newShipping },
        };
      }
    } catch (error) {
      throw new Error(error.message);
      console.log(error);
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
  async getAllOrders(query) {
    const { order_status, page, limit, sortBy } = query;
    let filter = {};
    try {
      if (order_status) {
        filter.order_status = order_status;
      }

      const options = {
        sortBy:
          sortBy && typeof sortBy === "string"
            ? { [sortBy]: sortOrder === "desc" ? -1 : 1 }
            : { createdAt: 1 },
        populate: "items.product_id",
        limit: limit ? parseInt(limit) : 5,
        page: page ? parseInt(page) : 1,
      };

      const totalItems = await OrderRepository.countDocuments(filter);
      const totalPages = Math.ceil(totalItems / options.limit);

      const data = await OrderRepository.getAllOrders(filter, options);
      return {
        messgae: "get all order success",
        limit,
        page,
        totalPages,
        data: data,
      };
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw error;
    }
  },
  async updateStatusOrder(id, status) {
    console.log(id);
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
