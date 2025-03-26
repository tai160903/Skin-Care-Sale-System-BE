const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  description: Joi.string().allow("", null),
  stock: Joi.number().integer().min(0).default(0),
  skinType: Joi.array().items(Joi.string()),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),
  price: Joi.number().positive(),
  category: Joi.string(),
  description: Joi.string().allow("", null),
  stock: Joi.number().integer().min(0),
  skinType: Joi.array().items(Joi.string()),
});

const productIdSchema = Joi.string().required();

const ratingSchema = Joi.number().min(1).max(5).required();

const querySchema = Joi.object({
  q: Joi.string().allow(""),
  category: Joi.string().allow(""),
  minPrice: Joi.number().min(0),
  maxPrice: Joi.greater(Joi.ref("minPrice")),
  sortBy: Joi.string().allow(""),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});

module.exports = {
  productSchema,
  updateProductSchema,
  productIdSchema,
  ratingSchema,
  querySchema,
};
