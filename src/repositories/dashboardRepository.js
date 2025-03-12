const Order = require("../models/order");

class DashboardRepository {
    async getRevenue(startDate, endDate) {
        return await Order.aggregate([
          { $match: { createdAt: { $gte: startDate, $lte: endDate }, order_status: "completed" } },
          { $group: { _id: null, totalRevenue: { $sum: "$totalPay" } } },
        ]);
      }
      async getBestSellingProducts(limit = 5) {
        return await Order.aggregate([
          { $unwind: "$items" },
          { $group: { _id: "$items.product_id", totalSold: { $sum: "$items.quantity" } } },
          { $sort: { totalSold: -1 } },
          { $limit: limit },
        ]);
      }
    
      async getTotalProductsSold() {
        return await Order.aggregate([
          { $unwind: "$items" },
          { $group: { _id: null, totalQuantity: { $sum: "$items.quantity" } } },
        ]);
      }
    
      async getTotalOrders() {
        return await Order.countDocuments();
      }
    
      async getTopCustomers(limit = 5) {
        return await Order.aggregate([
          { $group: { _id: "$customer_id", totalSpent: { $sum: "$totalPay" } } },
          { $sort: { totalSpent: -1 } },
          { $limit: limit },
        ]);
      }
    }
    
    module.exports = new DashboardRepository();