const Joi = require("joi");

const blogSchema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().required(),
  detail: Joi.array()
    .items(
      Joi.object({
        image: Joi.string().required(),
        text: Joi.string().required(),
      })
    )
    .required(),
});

const createBlogSchema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().required(),
  detail: Joi.array()
    .items(
      Joi.object({
        image: Joi.string().required(),
        text: Joi.string().required(),
      })
    )
    .required(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  image: Joi.string(),
  detail: Joi.array().items(
    Joi.object({
      image: Joi.string(),
      text: Joi.string(),
    })
  ),
});

module.exports = {
  blogSchema,
  createBlogSchema,
  updateBlogSchema,
};
