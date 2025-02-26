const Joi = require("joi");

const shippingSchema = Joi.object({
    address : Joi.string().required(),
    phone: Joi.string().required(),
});