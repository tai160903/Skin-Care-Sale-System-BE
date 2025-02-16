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
    try{
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

  findByUserId: async (userId) => {
    try {
      return await Customer.findOne({ user: userId }).populate("user", "email");
    } catch (error) {
      console.error("Error fetching customer by user ID:", error.message);
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
};

module.exports = customerRepository;
