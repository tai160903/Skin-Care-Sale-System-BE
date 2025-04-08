const { updatePromotionCondition } = require('../repositories/promotionConditionRepository');
const PromotionConditionService = require('../services/PromotionConditionService');

const PromotionConditionController = {
  async createPromotionCondition(req, res) {
    try {
      const promotionConditionData = req.body;
      const newPromotionCondition = await PromotionConditionService.createPromotionCondition(promotionConditionData);
      res.status(201).json(newPromotionCondition);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getPromotionConditionById(req, res) {
    try {
      const { id } = req.params;
      const promotionCondition = await PromotionConditionService.getPromotionConditionById(id);
      if (!promotionCondition) {
        return res.status(404).json({ message: 'Promotion condition not found' });
      }
      res.status(200).json(promotionCondition);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updatePromotionCondition(req, res) {
    try {
      const { id } = req.params;
      const promotionConditionData = req.body;
      const updatedPromotionCondition = await PromotionConditionService.updatePromotionCondition(id, promotionConditionData);
      if (!updatedPromotionCondition) {
        return res.status(404).json({ message: 'Promotion condition not found' });
      }
      res.status(200).json(updatedPromotionCondition);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
    async getAllPromotionConditions(req, res) {
        try {
        const promotionConditions = await PromotionConditionService.getAllPromotionConditions();
        res.status(200).json(promotionConditions);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    },
    async deletePromotionCondition(req, res) {
        try {
            const { id } = req.params;
            const deletedPromotionCondition = await PromotionConditionService.deletePromotionCondition(id);
            if (!deletedPromotionCondition) {
                return res.status(404).json({ message: 'Promotion condition not found' });
            }
            res.status(200).json({ message: 'Promotion condition deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}
module.exports = PromotionConditionController;