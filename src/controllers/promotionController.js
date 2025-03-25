const PromotionService = require("../services/promotionService")

const PromotionController = {
  getAllPromotions: async (req, res) => {
    try {
      const promotions = await PromotionService.getAllPromotions();
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPromotionById: async (req, res) => {
    try {
      const promotion = await PromotionService.getPromotionById(req.params.id);
      res.json(promotion);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createPromotion: async (req, res) => {
    try {
      const promotion = await PromotionService.createPromotion(req.body);
      res.status(201).json(promotion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  createPromotionOfCustomer : async (req, res) => {
    try {
      const promotion = await PromotionService.promotionOfCustomer(req.body.customer_id, req.body.point);
      res.status(201).json(promotion);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updatePromotion: async (req, res) => {
    try {
      const promotion = await PromotionService.updatePromotion(req.params.id, req.body);
      res.json(promotion);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deletePromotion: async (req, res) => {
    try {
      await PromotionService.deletePromotion(req.params.id);
      res.json({ message: "Promotion deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = PromotionController;
