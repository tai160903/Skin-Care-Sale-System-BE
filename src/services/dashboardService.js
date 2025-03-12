const DashboardRepository = require("../repositories/dashboardRepository");

const DashboardService = {
  async getRevenue(timeframe) {
    let startDate, endDate;
    const now = new Date();
    
    switch (timeframe) {
        case "day":
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);
            break;
        case "month":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999); 
            break;
        case "year":
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear(), 11, 31);
            endDate.setHours(23, 59, 59, 999);
            break;
        default:
            throw new Error("Invalid timeframe");
    }
   
    const revenue = await DashboardRepository.getRevenue(startDate, endDate);
    return revenue.length ? revenue[0].totalRevenue : 0;
}
,
      async getDashboardData() {
        const dailyRevenue = await this.getRevenue("day");
        const monthlyRevenue = await this.getRevenue("month");
        const yearlyRevenue = await this.getRevenue("year");
        const bestSellingProducts = await DashboardRepository.getBestSellingProducts();
        const totalProductsSold = await DashboardRepository.getTotalProductsSold();
        const totalOrders = await DashboardRepository.getTotalOrders();
        const topCustomers = await DashboardRepository.getTopCustomers();
    
        return {
          dailyRevenue,
          monthlyRevenue,
          yearlyRevenue,
          bestSellingProducts,
          totalProductsSold: totalProductsSold.length ? totalProductsSold[0].totalQuantity : 0,
          totalOrders,
          topCustomers,
        };
      }
    }
    
module.exports = DashboardService;
