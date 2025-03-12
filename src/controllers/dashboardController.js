const DashboardService = require("../services/dashboardService");

const DashboardController =  {
    async getDashboard(req, res) {
      try {
        const data = await DashboardService.getDashboardData();
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = DashboardController;