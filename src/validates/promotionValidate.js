const Joi = require("joi");

const promotionSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  discount_percentage: Joi.number().min(0).max(100).required(),
  start_date: Joi.date().min("now").required(),
  end_date: Joi.date().greater(Joi.ref("start_date")).required(),
  code: Joi.string().optional(),
  customer_id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(), // ObjectId validation
});

const updatePromotionSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),
  discount_percentage: Joi.number().min(0).max(100),
  start_date: Joi.date().greater("now"),
  end_date: Joi.date().greater(Joi.ref("start_date")),
});

const customerIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const pointSchema = Joi.number().valid(10000, 20000, 30000).required();

module.exports = {
  promotionSchema,
  updatePromotionSchema,
  customerIdSchema,
  pointSchema,
};
