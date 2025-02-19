const mongoose = require('mongoose');
const Shipping = require('../models/shipping');

const ShippingRepository = {
    async createShipping({ order_id, shippingdata }) {
        console.log("shippingdata", shippingdata);
        try {
            return await Shipping.create({ order_id: order_id, 
                shipping_address : shippingdata.address, 
                shipping_phone : shippingdata.phone,
                shipping_status : shippingdata.status });
        } catch (error) {
            console.error("Error creating shipping:", error);
            throw error;
        }
    },
    async getAllShipping() {
        try {
            return await Shipping.find();
        } catch (error) {
            console.error("Error fetching all shipping:", error);
            throw error;
        }
    },

    async getShippingByOrderId(orderId) {
        try {
            console.log("check: ", orderId)

            return await Shipping.findOne({ order_id: orderId.order_id });
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
            return await Shipping.findByIdAndUpdate(id, { shipping_status : status }, { new: true });
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
    }
};

module.exports = ShippingRepository;
