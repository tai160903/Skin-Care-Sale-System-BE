const { Types } = require("mongoose");
const Customer = require("../models/customer");

const customerRepository = {
  create: async (customerData) => {
    try {
      return await Customer.create(customerData);
    } catch (error) {
      console.error("Error creating customer:", error.message);
      throw new Error("Failed to create customer.");
    }
  },
  findById: async (id) => {
    try {
      return await Customer.findById(id);
    } catch (error) {
      console.error("Error fetching customer by ID:", error.message);
      throw new Error("Failed to fetch customer.");
    }
  },

  findAll: async () => {
    try {
      return await Customer.find().populate("user", "email");
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      throw new Error("Failed to fetch customers.");
    }
  },

  findByCustomerId: async (userId) => {
    try {
      const customer = await Customer.findOne({
        user: Types.ObjectId(userId),
      }).populate("user", "email");
      return customer || null;
    } catch (error) {
      console.error("Error fetching customer by userId:", error.message);
      throw new Error("Failed to fetch customer.");
    }
  },

  updateById: async (id, update) => {
    try {
      const customer = await Customer.findByIdAndUpdate(id, update, {
        new: true,
      });
      return customer ? customer : null;
    } catch (error) {
      console.error("Error updating customer:", error.message);
      throw new Error("Failed to update customer.");
    }
  },
  async getCustomerIdByUserId(userId) {
    try {
      const customer = await Customer.findOne({ user: userId });
      console.log("customer", customer);
      return customer;
    } catch (error) {
      console.error("Error fetching customerId:", error);
      throw error;
    }
  },
  async updatePoint(customerId, total) {
    try {
      const customer = await Customer.findById(customerId);
      if (!customer) {
        throw new Error("Customer not found.");
      }
      var points = Math.floor(total / 1000);
      customer.point += points;
      await customer.save();

      return customer;
    } catch (error) {
      console.error("Error updating customer points:", error.message);
      throw new Error("Failed to update customer points.");
    }
  },
};

module.exports = customerRepository;
