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
      throw new Error("Không tìm thấy khách hàng này.");
    }
  },

  findAll: async () => {
    try {
      return await Customer.find().populate("user", "email");
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      throw new Error("lấy danh sách khách hàng thất bại.");
    }
  },

  findByCustomerId: async (customerId) => {
    try {
      const customer = await Customer.findOne({
        _id: customerId,
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
      throw new Error("cập nhật khách hàng thất bại.");
    }
  },
  async getCustomerIdByUserId(userID) {
    try {
      const customer = await Customer.findOne({ user: userID }).populate(
        "user"
      );
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
        throw new Error("Không tìm thấy khách hàng.");
      }
      var points = Math.floor(total / 1000);
      customer.point += points;
      await customer.save();

      return customer;
    } catch (error) {
      console.error("Error updating customer points:", error.message);
      throw new Error("cập nhật điểm khách hàng thất bại.");
    }
  },
};

module.exports = customerRepository;
