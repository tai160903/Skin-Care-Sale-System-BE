const PromotionRepository = require("../repositories/promotionRepository")

const PromotionService = {
    getAllPromotions: async () => await PromotionRepository.getAll(),
  
    getPromotionById: async (id) => {
      const promotion = await PromotionRepository.getById(id);
      if (!promotion) throw new Error("Promotion not found");
      return promotion;
    },
  
    createPromotion: async (data) => await PromotionRepository.create(data),
  
    updatePromotion: async (id, data) => {
      const updatedPromotion = await PromotionRepository.update(id, data);
      if (!updatedPromotion) throw new Error("Promotion not found");
      return updatedPromotion;
    },
  
    deletePromotion: async (id) => {
      const deletedPromotion = await PromotionRepository.delete(id);
      if (!deletedPromotion) throw new Error("Promotion not found");
      return deletedPromotion;
    }
  };
  
  module.exports = PromotionService;