const ShippingRepository = require("../repositories/shippingRepository");

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
  async getAllShipping() {
    try {
      return await ShippingRepository.getAllShipping();
    } catch (error) {
      console.error("Error fetching all shipping:", error);
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
      return await ShippingRepository.updateStatusShipping(id, status);
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
};
module.exports = ShippingService;
