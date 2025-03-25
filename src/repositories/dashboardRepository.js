const Order = require("../models/order");

class DashboardRepository {
    async getRevenue(startDate, endDate) {
        return await Order.aggregate([
          { $match: { createdAt: { $gte: startDate, $lte: endDate }, order_status: "completed" } },
          { $group: { _id: null, totalRevenue: { $sum: "$totalPay" } } },
        ]);
      }

    async getBestSellingProducts(startDate, endDate, limit = 5) {
    return await Order.aggregate([
        { 
            $match: { 
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                order_status: "completed"
            } 
        },
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

async getTopCustomers(startDate, endDate, limit = 5) {
    return await Order.aggregate([
        { 
            $match: { 
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                order_status: "completed"
            } 
        },
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
async getTotalOrders(startDate, endDate) {
    return await Order.countDocuments({ 
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        order_status: "completed"
    });
}
async getTotalProductsSold(startDate, endDate) {
    return await Order.aggregate([
        { 
            $match: { 
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                order_status: "completed"
            } 
        },
        { $unwind: "$items" },
        { 
            $group: { 
                _id: null, 
                totalQuantity: { $sum: "$items.quantity" } 
            } 
        }
    ]);
}

  }
    
    module.exports = new DashboardRepository();