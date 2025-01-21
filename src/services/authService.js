const bcrypt = require("bcrypt");
const User = require("../models/user");
const randomstring = require("randomstring");
const sendEmail = require("../utils/sendEmail");
const jwtService = require("../services/jwtService");
const {
  registerSchema,
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  sendEmailVerifySchema,
  verifyEmailSchema,
  resetPasswordSchema,
  verifyResetPasswordSchema,
} = require("../validates/authValidate");

const authService = {
  register: async ({ email, password, confirmPassword }) => {
    const { error } = registerSchema.validate({
      email,
      password,
      confirmPassword,
    });

    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return { message: "Email already exists", status: 400 };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({ email, password: hashedPassword });
      const verifyEmail = await authService.sendEmailVerify({
        email,
        userId: newUser._id.toString(),
      });
      if (verifyEmail.status !== 200) {
        return verifyEmail;
      }

      return {
        message: "An Email sent to your account please verify",
        status: 201,
        data: newUser,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  login: async ({ email, password }) => {
    const { error } = loginSchema.validate({ email, password });
    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return { message: "User not found", status: 400 };
      }

      if (!user.isVerify) {
        return { message: "Please verify your email", status: 400 };
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return { message: "Incorrect password", status: 400 };
      }

      const accessToken = jwtService.generateAccessToken({
        _id: user._id,
        email: user.email,
        role: user.role,
      });

      const refreshToken = jwtService.generateRefreshToken({
        _id: user._id,
        email: user.email,
        role: user.role,
      });

      return {
        message: "Login successfully",
        status: 200,
        data: {
          user,
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  logout: async (res) => {
    try {
      res.clearCookie("refreshToken");
      return { message: "Logged out successfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  sendEmailVerify: async (req) => {
    const { error } = sendEmailVerifySchema.validate(req);
    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const { email, userId } = req;
      const newToken = randomstring.generate({
        length: 32,
        charset: "hex",
      });
      await User.updateOne(
        { _id: userId },
        { $set: { tokenVerify: newToken } }
      );
      const verificationLink = `${process.env.BASE_URL}/auth/verify-email/${newToken}/${userId}`;
      await sendEmail({
        to: email,
        subject: "Email Verification",
        message: `<p>Please verify your email by clicking the link: <a href="${verificationLink}">Verify Email</a></p>`,
      });

      return { message: "Email verification sent successfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  verifyEmail: async ({ id, tokenVerify }) => {
    const { error } = verifyEmailSchema.validate({ id, tokenVerify });
    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const user = await User.findOne({ _id: id, tokenVerify: tokenVerify });

      if (!user) {
        return { message: "Invalid link", status: 400 };
      }

      if (user.isVerify) {
        return { message: "Email already verified", status: 400 };
      }

      await User.updateOne(
        { _id: id },
        { $set: { tokenVerify: null, isVerify: true } }
      );

      return {
        message: "Email verified successfully",
        status: 200,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  sendEmailResetPassword: async (email) => {
    const { error } = resetPasswordSchema.validate({ email });
    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return { message: "User not found", status: 400 };
      }

      const token = randomstring.generate({
        length: 32,
        charset: "hex",
      });

      await User.updateOne(
        { _id: user._id },
        { $set: { tokenResetPassword: token } }
      );

      const resetLink = `${process.env.BASE_URL}/auth/verify-reset-password/${token}/${user._id}`;
      await sendEmail({
        to: email,
        subject: "Reset Password",
        message: `<p>Please reset your password by clicking the link: <a href="${resetLink}">Reset Password</a></p>`,
      });

      return { message: "Reset password sent successfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  verifyEmailResetPassword: async ({
    userId,
    token,
    newPassword,
    confirmNewPassword,
  }) => {
    const { error } = verifyResetPasswordSchema.validate({
      userId,
      token,
      newPassword,
      confirmNewPassword,
    });
    if (error) return { message: error.message, status: 400 };

    try {
      const user = await User.findOne({
        _id: userId,
        tokenResetPassword: token,
      });

      if (!user) {
        return { message: "Invalid link", status: 400 };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.updateOne(
        { _id: userId },
        { $set: { tokenResetPassword: null, password: hashedPassword } }
      );

      return {
        message: "Password updated successfully",
        status: 200,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },
  getUserDetail: async (userId) => {
    try {
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return { message: "User not found", status: 400 };
      }

      return { message: "User found", status: 200, data: user };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },
};

module.exports = authService;
