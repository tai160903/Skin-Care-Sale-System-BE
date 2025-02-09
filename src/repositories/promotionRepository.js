const Promotion = require("../models/promotion")

const PromotionRepository = {
    getAll:
     async () => await Promotion.find(),
    
    getById:
     async (id) => await Promotion.findById(id),
    getByCode:
      async (code) => await Promotion.findOne({ code }),
      
    create: async (data) => {
      const promotion = new Promotion(data);
      return await promotion.save();
    },
  
    update: async (id, data) => 
      await Promotion.findByIdAndUpdate(id, data, { new: true }),
  
    delete: async (id) => 
      await Promotion.findByIdAndDelete(id),
  };
  
  module.exports = PromotionRepository;