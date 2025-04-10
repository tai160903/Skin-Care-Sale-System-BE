const customerRepository = require("../repositories/customerRepository");
const userRepository = require("../repositories/userRepository");

const userService = {
  getAllCustomer: async () => {
    const data = await customerRepository.findAll();
    return {
      message: "Get all users successfully",
      data: data,
      status: 200,
    };
  },

  getCustomerById: async (id) => {
    const customer = await customerRepository.findByCustomerId(id);

    return {
      message: "Get customer by id successfully",
      data: customer,
      status: 200,
    };
  },

  updateUserById: async (id, data) => {
    const user = await customerRepository.findByUserId(id);
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    const updatedUser = await customerRepository.updateById(user._id, data);
    return {
      message: "Update user by id successfully",
      data: updatedUser,
      status: 200,
    };
  },

  deleteUserById: async (id) => {
    const user = await customerRepository.findByUserId(id);
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    await customerRepository.updateById(user._id, { isDeleted: true });
    return {
      message: "Delete user by id successfully",
      status: 200,
    };
  },
  async getCustomerIdByUserId(customerId) {
    const customerID = await customerRepository.getCustomerIdByUserId(
      customerId
    );
    return customerID;
  },
  async createEmployee(data) {
    const user = await userRepository.createEmployee(data);
    return user;
  },

  async getAllStaff() {
    const data = await userRepository.findAllStaff();
    return { message: "get staff successed", data };
  },
  async updateCustomer(customer_id, updatedata) {
    const data = await customerRepository.updateById(customer_id, updatedata);
    return { message: "update customer successed", data };
  },
};
module.exports = userService;
