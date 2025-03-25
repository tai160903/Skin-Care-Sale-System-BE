const PromotionRepository = require("../repositories/promotionRepository");
const CustomerRepository = require("../repositories/customerRepository");
const crypto = require("crypto");
const {
  promotionSchema,
  updatePromotionSchema,
  customerIdSchema,
  pointSchema,
} = require("../validator/promotionValidator");

const PromotionService = {
  getAllPromotions: async () => await PromotionRepository.getAll(),

  getPromotionById: async (id) => {
    const promotion = await PromotionRepository.getById(id);
    if (!promotion) throw new Error("Promotion not found");
    return promotion;
  },

  createPromotion: async (data) => {
    const { error } = promotionSchema.validate(data);
    if (error) throw new Error(error.details[0].message);
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

  promotionOfCustomer: async (customer_id, point) => {
    const { error: idError } = customerIdSchema.validate(customer_id);
    if (idError) throw new Error(idError.details[0].message);

    const { error: pointError } = pointSchema.validate(point);
    if (pointError) throw new Error(pointError.details[0].message);

    const now = new Date();
    const startDate = now;
    let discount = 0;

    let code = crypto.randomBytes(6).toString("hex").toUpperCase();
    console.log(code);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const customer = await CustomerRepository.findById(customer_id);
    let name = "Promotion for customer " + customer.name;
    if (!customer) {
      throw new Error("Customer not found");
    }

    if (point == 10000) {
      discount = 5;
    } else if (point == 20000) {
      discount = 7;
    } else if (point == 30000) {
      discount = 10;
    }
    customer.point -= point;
    await customer.save();

    const promotion = await PromotionRepository.create({
      name,
      customer_id,
      discount_percentage: discount,
      code,
      start_date: startDate,
      end_date: endDate,
    });

    return { message: "Promotion created successfully", data: promotion };
  },

  updatePromotion: async (id, data) => {
    const { error } = updatePromotionSchema.validate(data);
    if (error) throw new Error(error.details[0].message);
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
    return {
      message: "Promotion updated successfully",
      data: updatedPromotion,
    };
  },

  deletePromotion: async (id) => {
    const deletedPromotion = await PromotionRepository.delete(id);
    if (!deletedPromotion) throw new Error("Promotion not found");
    return deletedPromotion;
  },
};

module.exports = PromotionService;
