const userService = require("../services/userService");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateUserById: async (req, res) => {
    try {
      const user = await userService.updateUserById(req.params.id, req.body);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
