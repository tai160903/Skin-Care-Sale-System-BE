const ShippingRepository = require("../repositories/shippingRepository");
const OrderRepository = require("../repositories/orderRepository");
const WAREHOUSE_LOCATION = { lat: 10.84144, lng: 106.80986 };

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
      const data = await ShippingRepository.updateStatusShipping(id, status);
      if(!data){
        return ({message : "update status shipping failed"});
      }
      if(status === "Delivered"){
      const order_status = "completed";
      const order = await OrderRepository.updateStatusOrder(shipping.order_id,order_status);
      if(!order){
        return ({message : "update status order fail"});
      }
    }
      return ({message : "update status shipping success", data});
    
    } catch (error) {
      console.error("Error updating shipping status:", error);
      throw error;
    }
  },

  async updateReasonShipping(id, reason) {
    try {
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

    const price = (distance / 1000) * 10000;

    return ({message : "calculate shipping success", data : price});
  }
}
module.exports = ShippingService;
