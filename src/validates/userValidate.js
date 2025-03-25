const Joi = require("joi");

const objectIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]{10,11}$/),
  address: Joi.string().trim().min(5).max(255),
  isDeleted: Joi.boolean(),
});

const createEmployeeSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required(),
  role: Joi.string().valid("admin", "staff").required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  objectIdSchema,
  updateUserSchema,
  createEmployeeSchema,
};
