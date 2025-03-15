const mongoose = require("mongoose");
const Shipping = require("../models/shipping");

const ShippingRepository = {
  async createShipping({ order_id, shippingdata }) {
    try {
      return await Shipping.create({
        customer_id: shippingdata.customer_id,
        order_id: order_id,
        shipping_address: shippingdata.address,
        shipping_phone: shippingdata.phone,
        shipping_status: shippingdata.status,
      });
    } catch (error) {
      console.error("Error creating shipping:", error);
      throw error;
    }
  },
  async getAllShipping(filter = {}, { page, limit }) {
    try {
        const query = {};

        if (filter.order_id) query.order_id = filter.order_id;
        if (filter.customer_id) query.customer_id = filter.customer_id;
        if (filter.shipping_status) query.shipping_status = filter.shipping_status;

        const totalItems = await Shipping.countDocuments(query);
        const shippings = await Shipping.find(query)
            .populate('order_id')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        return {
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            data: shippings
        };
    } catch (error) {
        console.error("Error fetching all shipping:", error);
        throw error;
    }
},
  async getShippingByCustomerId(customerId) {
    try {
      return await Shipping.find({ customer_id: customerId.customer_id });
    } catch (error) {
      console.error("Error fetching shipping by customer_id:", error);
      throw error;
    }
  },
  async getShippingByStatus(status){
    try {
      return await Shipping.find({shipping_status: status});
    } catch (error) {
      console.error("Error fetching shipping by status:", error);
      throw error;
    }
  },
  async getShippingByCustomerAndStatus(customerId, status) {
    try {
      return await Shipping.find({
        customer_id: customerId.customer_id,
        shipping_status: status,
      });
    } catch (error) {
      console.error("Error fetching shipping by customer_id:", error);
      throw error;
    }
  },

  async getShippingByOrderId(orderId) {
    try {
     
      const ship = await Shipping.findOne({ order_id : orderId });
      return ship;
    } catch (error) {
      console.error("Error fetching shipping by order_id:", error);
      throw error;
    }
  },

  async getShippingById(id) {
    try {
      return await Shipping.findById(id);
    } catch (error) {
      console.error("Error fetching shipping by id:", error);
      throw error;
    }
  },

  async updateStatusShipping(id, status) {
    try {
      return await Shipping.findByIdAndUpdate(
        id,
        { shipping_status: status },
        { new: true }
      );
    } catch (error) {
      console.error("Error updating shipping status:", error);
      throw error;
    }
  },

  async updateReasonShipping(id, reason) {
    try {
      return await Shipping.findByIdAndUpdate(id, { reason }, { new: true });
    } catch (error) {
      console.error("Error updating shipping reason:", error);
      throw error;
    }
  },
};

module.exports = ShippingRepository;
