const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const sendOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

const sendEmailVerifySchema = Joi.object({
  email: Joi.string().email().required(),
  userId: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  tokenVerify: Joi.string().required(),
  id: Joi.string().required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const changePasswordSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().min(6).max(20).required(),
  newPassword: Joi.string().min(6).max(20).required(),
  confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
});

const verifyResetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  userId: Joi.string().required(),
  newPassword: Joi.string()
    .min(6)
    .max(20)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
    .messages({
      "string.min": "Password must be at least 6 characters long", // Custom message for minimum length
      "string.max": "Password must not exceed 20 characters", // Custom message for maximum length
      "string.pattern.base":
        "Password must be between 6 and 20 characters and contain only alphanumeric characters",
    }),
  confirmNewPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Password and confirm password do not match",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  sendEmailVerifySchema,
  verifyEmailSchema,
  resetPasswordSchema,
  verifyResetPasswordSchema,
  changePasswordSchema,
};
