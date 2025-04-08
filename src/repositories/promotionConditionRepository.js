const PromotionCondition = require("../models/promotionCondition");

const PromotionConditionRepository = {
  async createPromotionCondition(promotionConditionData) {
    try {
      const promotionCondition = new PromotionCondition(promotionConditionData);
      return await promotionCondition.save();
    } catch (error) {
      throw new Error("Error creating promotion condition: " + error.message);
    }
  },
  async getPromotionConditionByPoint(point) {
    try {
      return await PromotionCondition.findOne({ point });
    } catch (error) {
      throw new Error("Error fetching promotion condition by point: " + error.message);
    }
  },
  async getPromotionConditionById(id) {
    try{
        const promotiondtaCondition = await PromotionCondition.findById(id);
        if (!promotionCondition) {
            throw new Error("Promotion condition not found");
    }
        return promotiondtaCondition;
    } catch (error) {
      throw new Error("Error fetching promotion condition: " + error.message);
    }
},
    async getAllPromotionConditions() {
        try {
            return await PromotionCondition.find();
        } catch (error) {
            throw new Error("Error fetching promotion conditions: " + error.message);
        }
    },
    async updatePromotionCondition(id, promotionConditionData) {
        try {
            const updatedPromotionCondition = await PromotionCondition.findByIdAndUpdate(
                id,
                promotionConditionData,
                { new: true }
            );
            if (!updatedPromotionCondition) {
                throw new Error("Promotion condition not found");
            }
            return updatedPromotionCondition;
        } catch (error) {
            throw new Error("Error updating promotion condition: " + error.message);
        }
    }, 
    async deletePromotionCondition(id){
        try {
            const deletedPromotionCondition = await PromotionCondition.findByIdAndDelete(id);
            if (!deletedPromotionCondition) {
                throw new Error("Promotion condition not found");
            }
            return deletedPromotionCondition;
        } catch (error) {
            throw new Error("Error deleting promotion condition: " + error.message);
        }
    }
}
module.exports = PromotionConditionRepository;