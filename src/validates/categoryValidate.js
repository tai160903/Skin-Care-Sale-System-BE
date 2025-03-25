const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const getByIdCategorySchema = Joi.object({
  id: Joi.string().required(),
});

const deleteCategorySchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  categorySchema,
  createCategorySchema,
  updateCategorySchema,
  getByIdCategorySchema,
  deleteCategorySchema,
};
