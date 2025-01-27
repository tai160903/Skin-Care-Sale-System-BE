const Customer = require("../models/customer");

// repository customer
const customerRepository = {
  create: async (customerData) => {
    return await Customer.create(customerData);
  },
  findAll: async () => {
    return await Customer.find().populate("user", "email");
  },
  findByUserId: async (userId) => {
    return await Customer.findOne({ user: userId }).populate("user", "email");
  },
  updateById: async (id, update) => {
    return await Customer.findOneAndUpdate({ _id: id }, update, { new: true });
  },
};

module.exports = customerRepository;
