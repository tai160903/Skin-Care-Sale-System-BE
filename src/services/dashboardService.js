const DashboardRepository = require("../repositories/dashboardRepository");

const DashboardService = {
  async getDashboardData(startDate, endDate) {
    const revenue = await DashboardRepository.getRevenue(startDate, endDate);
    const bestSellingProducts = await DashboardRepository.getBestSellingProducts(startDate, endDate);
    const totalProductsSold = await DashboardRepository.getTotalProductsSold(startDate, endDate);
    const totalOrders = await DashboardRepository.getTotalOrders(startDate, endDate);
    const topCustomers = await DashboardRepository.getTopCustomers(startDate, endDate);

    return {
      revenue: revenue.length ? revenue[0].totalRevenue : 0,
      bestSellingProducts,
      totalProductsSold: totalProductsSold.length ? totalProductsSold[0].totalQuantity : 0,
      totalOrders,
      topCustomers,
    };
  }
}

    
module.exports = DashboardService;
