const PromotionConditionRepository = require('../repositories/promotionConditionRepository');

const PromotionConditionService = {
  async createPromotionCondition(promotionConditionData) {
    try {
      return await PromotionConditionRepository.createPromotionCondition(promotionConditionData);
    } catch (error) {
      throw new Error('Error creating promotion condition: ' + error.message);
    }
  },

  async getPromotionConditionById(id) {
    try {
      const data = await PromotionConditionRepository.getPromotionConditionById(id);
      return ({message: 'Promotion condition fetched successfully', data});
    } catch (error) {
      throw new Error('Error fetching promotion condition: ' + error.message);
    }
  },

  async getAllPromotionConditions() {
    try {
      const data = await PromotionConditionRepository.getAllPromotionConditions();
        return ({message: 'Promotion conditions fetched successfully', data});
    } catch (error) {
      throw new Error('Error fetching promotion conditions: ' + error.message);
    }
  },

  async updatePromotionCondition(id, promotionConditionData) {
    try {
      return await PromotionConditionRepository.updatePromotionCondition(id, promotionConditionData);
    } catch (error) {
      throw new Error('Error updating promotion condition: ' + error.message);
    }
  },
  async deletePromotionCondition(id) {
    try {
      return await PromotionConditionRepository.deletePromotionCondition(id);
    } catch (error) {
      throw new Error('Error deleting promotion condition: ' + error.message);
    }
  }

};

module.exports = PromotionConditionService;