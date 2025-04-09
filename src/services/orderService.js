const OrderRepository = require("../repositories/orderRepository");
const CartRepository = require("../repositories/cartRepository");
const ShippingRepository = require("../repositories/shippingRepository");
const stripe = require("../config/stripe");
const CustomerRepository = require("../repositories/customerRepository");
const ProductRepository = require("../repositories/productRepository");
const ShippingService = require("../services/shippingService");
const PromotionUsageRepository = require("../repositories/promotionUsageRepository");


const OrderService = {
  async createOrder(
    customerId,
    payment_method,
    address,
    phone,
    name,
    discounted,
    totalPay,
    shipping_price,
    promotionId
  ) {
    try {
      let cart = await CartRepository.getCartByCustomerId(customerId);
      if (!cart) throw new Error("không tim thấy giỏ hàng");

      await ProductRepository.checkStockAvailability(cart.items);

      let newOrder = await OrderRepository.createOrder({
        customer_id: customerId,
        items: cart.items,
        totalPay: totalPay,
        discount: discounted,
        payment_method: payment_method,
        shipping_price: shipping_price,
      });

      let newShipping = await ShippingRepository.createShipping({
        order_id: newOrder._id,
        shippingdata: {
          name: name,
          customer_id: customerId,
          address: address,
          phone: phone,
          status: "Pending",
        },
      });

      if (promotionId) {
        const promotion = await PromotionUsageRepository.findUsage(
          customerId,
          promotionId
        );
        if (promotion) {
          throw new Error("Bạn đã sử dụng mã giảm giá này trước đó");
        }
        await PromotionUsageRepository.createUsage(customerId, promotionId);
      }

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
          cancel_url: `http://localhost:5173/cancel?order_id=${newOrder._id.toString()}`,
          metadata: {
            order_id: newOrder._id.toString(),
            shipping_id: newShipping._id.toString(),
            customer_id: customerId.toString(),
          },
        });

        checkoutUrl = session.url; // Lưu URL thanh toán để gửi về FE
        await ProductRepository.updateStockAndPurchaseCount(newOrder.items);
        console.log("customerId", customerId);
        await CustomerRepository.updatePoint(customerId, newOrder.totalPay);
        return {
          messase: "Tạo đơn hàng thành công",
          data: { Url: checkoutUrl, order: newOrder, shipping: newShipping },
        };
      } else {
        await ProductRepository.updateStockAndPurchaseCount(newOrder.items);
        await CustomerRepository.updatePoint(
          customerId,
          newOrder.totalPay - newOrder.shipping_price
        );
        await CartRepository.clearCart(customerId);
        return {
          messase: "Tạo đơn hàng thành công",
          data: { order: newOrder, shipping: newShipping },
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getOrderById(id) {
    try {
      const order = await OrderRepository.getOrderById(id);
      if (!order) {
        throw new Error("không tìm thấy đơn hàng");
      }
      return { message: "get order success", data: order };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteOrderById(id) {
    const order = await OrderRepository.getOrderById(id);

    console.log(order);
    await ProductRepository.restoreStockAndPurchaseCount(order.items);

    return await OrderRepository.deleteOrderById(id);
  },
  async getAllOrders(query) {
    const { order_status, page, limit, sortBy, sortOrder } = query;
    let filter = {};
    try {
      if (order_status) {
        filter.order_status = order_status;
      }

      const options = {
        sortBy:
          sortBy && typeof sortBy === "string"
            ? { [sortBy]: sortOrder === "desc" ? -1 : 1 }
            : { createdAt: -1 },
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
    const order = await OrderRepository.getOrderById(id);
    const ship = await ShippingRepository.getShippingByOrderId(id);

    if (!ship) {
      throw new Error("không tìm thấy giao hàng");
    }

    if (order.order_status == "confirmed " && status == "pending") {
      throw new Error(
        "đơn hàng đã được xác nhận, không thể chuyển về trạng thái chờ xác nhận"
      );
    }
    if (order.order_status == "pending" && status == "completed") {
      throw new Error(
        "đơn hàng chưa được xác nhận, không thể chuyển về trạng thái đã hoàn thành"
      );
    }
    if (status == "completed"){
      await CustomerRepository.updatePoint(
        console.log("customerId", order.customer_id),
        order.customer_id,
        order.totalPay - order.shipping_price
      );
    }

    if (
      order.order_status == "completed" &&
      ship.shipping_status == "Delivered"
    ) {
      throw new Error("đơn hàng đã được giao, không thể chuyển về trạng thái ");
    }

    if (status == "cancelled") {
      let statusShipping = "Cancelled";
      if(ship.shipping_status == "Cancelled") {
        console.log("đơn hàng đã được hủy");
        await ProductRepository.restoreStockAndPurchaseCount(order.items);
      } else {
      await ShippingService.updateStatusShipping(ship._id, statusShipping);
      await ProductRepository.restoreStockAndPurchaseCount(order.items);
    }
  }

    if (order.order_status == "cancelled") {
      throw new Error(
        "đơn hàng này đã được hủy, nên không thể chỉnh sửa trạng thái"
      );
    }
    return await OrderRepository.updateStatusOrder(id, status);
  },
  async getOrdersByCustomerId(customerId) {
    return await OrderRepository.getOrdersByCustomerId(customerId);
  },
};

module.exports = OrderService;
