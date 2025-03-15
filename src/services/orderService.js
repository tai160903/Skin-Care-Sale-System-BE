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
  async getAllOrders(filter, pagination) {
    try {
      const data = await OrderRepository.getAllOrders(filter, pagination);
      return { messgae: "get all order success", data };
    } catch (error) {
      console.error("Error fetching all orders:", error);
      throw error;
    }
  },
  async updateStatusOrder(id, status) {
    console.log(id);
    const order = await OrderRepository.getOrderById(id);
    const ship = await ShippingRepository.getShippingByOrderId(id);


    if (!ship) {
      throw new Error("Shipping not found");
    }

    if(order.order_status == "confirmed " && status == "pending"){
      throw new Error("đơn hàng đã được xác nhận, không thể chuyển về trạng thái chờ xác nhận");
    }
    if(order.order_status == "completed" && ship.shipping_status == "Delivered"){
      throw new Error("đơn hàng đã được giao, không thể chuyển về trạng thái ");
    }

    if (status == "Cancelled") {
      await ShippingService.updateStatusShipping(ship._id,status);
      await productRepository.restoreStockAndPurchaseCount(order.items);
    }


    if (order.order_status == "Cancelled") {
      throw new Error("đơn hàng này đã được hủy, nên không thể chỉnh sửa trạng thái");
    }
    return await OrderRepository.updateStatusOrder(id, status);
  },
};

module.exports = OrderService;
