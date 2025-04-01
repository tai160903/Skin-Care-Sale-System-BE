const PromotionUsage = require("../models/PromotionUsage");

const PromotionUsageRepository = {
    async findUsage(customerId, promotionId) {
        return await PromotionUsage.findOne({ customer_id: customerId, promotion_id: promotionId });
      },
      async createUsage(customerId, promotionId) {
        return await PromotionUsage.create({ customer_id: customerId, promotion_id: promotionId });
},
}

module.exports = PromotionUsageRepository