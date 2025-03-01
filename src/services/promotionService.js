const PromotionRepository = require("../repositories/promotionRepository")

const PromotionService = {
    getAllPromotions: async () => await PromotionRepository.getAll(),
  
    getPromotionById: async (id) => {
      const promotion = await PromotionRepository.getById(id);
      if (!promotion) throw new Error("Promotion not found");
      return promotion;
    },
  
    createPromotion: async (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);
      const now = new Date();
      
      if (startDate >= endDate) 
          throw new Error("Start date must be before end date");
      if (data.discount_percentage < 0 || data.discount_percentage > 100)
          throw new Error("Discount percentage must be between 0 and 100.");
      if (startDate < now || endDate < now)
          throw new Error("Start date and end date must be in the future.");
      
      const promotions = await PromotionRepository.create(data);
      return { message: "Promotion created successfully", data: promotions };
  },
  
    updatePromotion: async (id, data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);
      const now = new Date();
      
      if (startDate >= endDate) 
          throw new Error("Start date must be before end date");
      if (data.discount_percentage < 0 || data.discount_percentage > 100)
          throw new Error("Discount percentage must be between 0 and 100.");
      if (startDate < now || endDate < now)
          throw new Error("Start date and end date must be in the future.");
      const updatedPromotion = await PromotionRepository.update(id, data);
      return {message : "Promotion updated successfully", data : updatedPromotion};
    },
  
    deletePromotion: async (id) => {
      const deletedPromotion = await PromotionRepository.delete(id);
      if (!deletedPromotion) throw new Error("Promotion not found");
      return deletedPromotion;
    }
  };
  
  module.exports = PromotionService;