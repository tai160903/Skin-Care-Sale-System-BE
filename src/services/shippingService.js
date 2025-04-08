const ShippingRepository = require("../repositories/shippingRepository");
const OrderRepository = require("../repositories/orderRepository");
const WAREHOUSE_LOCATION = { lat: 10.84144, lng: 106.80986 };
const geolib = require("geolib");
const ShipFeeService = require("../services/shipFeeService");
const OrderService = require("../services/orderService");

const ShippingService = {
  async createShipping({ order_id, shippingdata }) {
    try {
      return await ShippingRepository.createShipping({
        order_id,
        shippingdata,
      });
    } catch (error) {
      console.error("Error creating shipping:", error);
      throw error;
    }
  },
  
  async getAllShipping(filter, pagination) {
    try {
       const data = await ShippingRepository.getAllShipping(filter, pagination);
        return ({messgae : "get all shipping success", data});
    } catch (error) {
        console.error("Error fetching all shipping:", error);
        throw error;
    }
},

  async getShippingByCustomerId(customerId) {
    try {
      const data = await ShippingRepository.getShippingByCustomerId(customerId);
      return({message :" get shipping success", data});
    } catch (error) {
      console.error("Error fetching shipping by customer_id:", error);
      throw error;
    }
  },
  async getShippingByStatus(status) {
    try {
      const data = await ShippingRepository.getShippingByStatus(status);
      return({message :" get shipping success", data});
    } catch (error) {
      console.error("Error fetching shipping by status:", error);
      throw error;
    }
  },
  async getShippingByCustomerAndStatus(customerId, status) {
    try {
      const data = await ShippingRepository.getShippingByCustomerAndStatus(
        customerId,
        status
      );
      return({message :" get shipping success", data});
    } catch (error) {
      console.error("Error fetching shipping by customer_id:", error);
      throw error;
    }
  },

  async getShippingByOrderId(orderId) {
    try {
      return await ShippingRepository.getShippingByOrderId(orderId);
    } catch (error) {
      console.error("Error fetching shipping by order_id:", error);
      throw error;
    }
  },

  async getShippingById(id) {
    try {
      return await ShippingRepository.getShippingById(id);
    } catch (error) {
      console.error("Error fetching shipping by id:", error);
      throw error;
    }
  },
  async updateStatusShipping(id, status) {
    try {
      const shipping = await ShippingRepository.getShippingById(id);
      if (!shipping) {
        return ({message : "shipping not found"});
      }
      console.log("status:", status);
      const order = await OrderRepository.getOrderById(shipping.order_id);
      if(status === "Cancelled"){
        const order_status = "cancelled";
        await OrderService.updateStatusOrder(shipping.order_id,order_status);
        return await ShippingRepository.updateStatusShipping(id, status);
      }
      if(shipping.shipping_status === "Pending" && status === "Delivered"){
        return ({message : "đơn hàng chưa được vận chuyển, nên không chuyển thành đã giao được"});
      }
      if(order.order_status === "pending" && ["Shipping", "Delivered", "Cancelled"].includes(status)){
        return ({message : "đơn hàng chưa được xác nhận, không thể chuyển về trạng thái giao hàng"});
      }
      if(order.order_status === "cancelled" && ["Shipping", "Delivered", "Cancelled"].includes(status)){
        return ({message : "đơn hàng đã được hủy, không thể chuyển về trạng thái giao hàng"});
      }
      if(shipping.shipping_status === "Cancelled"){
        return ({message : "đơn hàng đã được hủy, không thể chuyển về trạng thái giao hàng"});
      }

      if (shipping.shipping_status === "Delivered") {
        return ({message : "đơn hàng đã được giao"});
      }
     


      if(status === "Delivered"){
      const order_status = "completed";
      const order = await OrderRepository.updateStatusOrder(shipping.order_id,order_status);
      if(!order){
        return ({message : "update status order fail"});
      }
    }
    const data = await ShippingRepository.updateStatusShipping(id, status);
    if(!data){
      return ({message : "update status shipping failed"});
    }
      return ({message : "update status shipping success", data});
    
    } catch (error) {
      console.error("Error updating shipping status:", error);
      throw error;
    }
  },

  async updateReasonShipping(id, reason) {
    try {


      const shipping = await ShippingRepository.getShippingById(id);
      if (!shipping) {
        return ({message : "không tìm thấy đơn hàng"});
      }
      if (shipping.shipping_status === "Delivered") {
        return ({message : "đơn hàng đã được giao, không thể cập nhật lý do"});
      }
      if(reason !== ""){ 
        const status = "Cancelled";
        await this.updateStatusShipping(shipping._id, status);
      }

      return await ShippingRepository.updateReasonShipping(id, reason);
    } catch (error) {
      console.error("Error updating shipping reason:", error);
      throw error;
    }
  },
  async calculateShipping(lat,lng){
          const distance = geolib.getDistance(
      { latitude: parseFloat(lat), longitude: parseFloat(lng) },
      { latitude: WAREHOUSE_LOCATION.lat, longitude: WAREHOUSE_LOCATION.lng }
    );
    const shippFee = await ShipFeeService.getShipFeeById("67d46df8b620e792c151f0fc")

    const price = ((distance / 1000) * shippFee.shiping_price).toFixed(2);

    return price;
  }
}
module.exports = ShippingService;
