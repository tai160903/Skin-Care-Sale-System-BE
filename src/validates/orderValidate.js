const Joi = require("joi");

const createOrderSchema = Joi.object({
  customerId: Joi.string().required(),
  payment_method: Joi.string().valid("cod", "stripe").required(),
  address: Joi.string().min(5).max(255).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required(),
  discount: Joi.number().min(0).default(0),
  totalPay: Joi.number().min(0).required(),
  shipping_price: Joi.number().min(0).required(),
});

const idSchema = Joi.string().required();

const statusSchema = Joi.string()
  .valid("pending", "confirmed", "completed", "cancelled")
  .required();

module.exports = {
  createOrderSchema,
  idSchema,
  statusSchema,
};
