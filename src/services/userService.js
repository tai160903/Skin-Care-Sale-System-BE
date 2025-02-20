const customerRepository = require("../repositories/customerRepository");
const userService = {
  getAllUsers: async () => {
    const data = await customerRepository.findAll();
    return {
      message: "Get all users successfully",
      data: data,
      status: 200,
    };
  },

  getCustomerById: async (id) => {
    const user = await customerRepository.findByCustomerId(id);
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    return {
      message: "Get user by id successfully",
      data: user,
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
  async getCustomerIdByUserId(userId) {
    const customerID = await customerRepository.getCustomerIdByUserId(userId);
    return customerID
    ;
  }
};
module.exports = userService;
