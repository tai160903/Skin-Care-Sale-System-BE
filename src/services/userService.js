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

  getUserById: async (id) => {
    const user = await customerRepository.findByUserId(id);
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
};

module.exports = userService;
