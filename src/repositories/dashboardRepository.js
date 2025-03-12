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
            { 
                $group: { 
                    _id: "$items.product_id", 
                    totalSold: { $sum: "$items.quantity" }
                } 
            },
            { 
                $lookup: {
                    from: "products", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                } 
            },
            { $unwind: "$productInfo" },
            { $sort: { totalSold: -1 } },
            { $limit: limit },
            { 
                $project: { 
                    _id: 1, 
                    totalSold: 1,
                    "productInfo.name": 1 
                } 
            }
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
    
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Retrieves the top customers based on their total spending.
 *
 * This function aggregates order data to calculate the total amount spent by each customer
 * and returns the top customers sorted by total spending in descending order. The customer
 * information is also included in the result.
 *
 * @param {number} limit - The maximum number of top customers to retrieve. Defaults to 5.
 * @returns {Promise<Array>} A promise that resolves to an array of objects containing
 *                           the customer ID, total amount spent, and customer name.
 */

/******  c6759550-4827-4d54-b7e0-14734833b777  *******/
      async getTopCustomers(limit = 5) {
        return await Order.aggregate([
            {
                $group: {
                    _id: "$customer_id",
                    totalSpent: { $sum: "$totalPay" }
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "customerInfo"
                }
            },
            { $unwind: "$customerInfo" }, 
            { $sort: { totalSpent: -1 } },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    totalSpent: 1,
                    "customerInfo.name": 1 
                }
            }
        ]);
    }
  }
    
    module.exports = new DashboardRepository();