const DashboardService = require("../services/dashboardService");

const DashboardController =  {
  async getDashboard(req, res) {
    try {
      let { startDate, endDate } = req.query;

      console.log(startDate, endDate);
      
      if (!startDate || !endDate) {
        const now = new Date();
        startDate = new Date(now.getFullYear(), now.getMonth(), 1); 
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); 
        endDate.setHours(23, 59, 59, 999);
      } else {
       
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        endDate.setHours(23, 59, 59, 999); 
      }

      const data = await DashboardService.getDashboardData(startDate, endDate);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
  module.exports = DashboardController;