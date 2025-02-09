const userService = require("../services/userService");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const response = await userService.getAllUsers();
      return res.status(response?.status || 200).json({
        message: response?.message,
        data: response?.data,
      });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const response = await userService.getUserById(req.params.id);
      return res.status(response?.status || 200).json({
        message: response?.message,
        data: response?.data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const response = await userService.updateUserById(
        req.params.id,
        req.body
      );
      return res.status(response?.status).json({
        message: response?.message,
        data: response?.data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const user = await userService.deleteUserById(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createEmployee: async (req, res) => {
    try {
      const user = await userService.createEmployee(req.body);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
