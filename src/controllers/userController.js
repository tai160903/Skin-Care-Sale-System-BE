const userService = require("../services/userService");

const userController = {
  getAllCustomer: async (req, res) => {
    try {
      const response = await userService.getAllCustomer();
      return res.status(response?.status || 200).json({
        message: response?.message,
        data: response?.data,
      });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  getCustomerById: async (req, res) => {
    try {
      const id = req.params.customerId;
      const response = await userService.getCustomerById(id);
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
  getAllStaff: async (req, res) => {
    try {
      const data = await userService.getAllStaff();
      return res.status(200).json(data);
    } catch {
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
  async GetCustomerIdByUserId(req, res) {
    try {
      const customerId = await userService.getCustomerIdByUserId(
        req.params.customerId
      );
      return res.json(customerId);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async updateCustomer(req, res) {
    try {
      const data = await userService.updateCustomer(
        req.params.customerId,
        req.body
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
