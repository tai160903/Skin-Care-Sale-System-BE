const bcrypt = require("bcrypt");
const User = require("../models/userModel");
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

      const otpResponse = await authService.sendOtp(email);

      if (otpResponse.status !== 200) {
        return otpResponse;
      }

      return {
        message: "OTP sent to email",
        status: 200,
        data: otpResponse.otp,
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

  sendOtp: async (email) => {
    const { error } = sendOtpSchema.validate({ email });
    if (error) return { message: error.details[0].message, status: 400 };

    const generateOtp = () => {
      return randomstring.generate({
        length: 6,
        charset: "numeric",
      });
    };

    try {
      const newOtp = generateOtp();
      const expOtp = new Date(Date.now() + 5 * 60 * 1000);
      await User.updateOne({ email }, { $set: { otp: newOtp, expOtp } });
      await sendEmail({
        to: email,
        subject: "OTP Verification",
        message: `<p>Your OTP is: <strong>${newOtp}</strong></p>`,
      });

      return { message: "OTP sent successfully", status: 200, otp: newOtp };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  verifyOtp: async ({ email, otp }) => {
    const { error } = verifyOtpSchema.validate({ email, otp });
    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return { message: "Invalid email", status: 400 };
      }

      const isOtpValid = user.otp === otp;
      const isOtpExpired = user.expOtp < new Date();

      if (!isOtpValid || isOtpExpired) {
        return {
          message: isOtpValid ? "OTP expired" : "Invalid OTP",
          status: 400,
        };
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

      await User.findByIdAndUpdate(user._id, {
        otp: "",
        expOtp: "",
      });

      return {
        message: "OTP verified successfully",
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
      const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${newToken}&userId=${userId}`;
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

      const resetLink = `${process.env.CLIENT_URL}/verify-reset-password?token=${token}&userId=${user._id}`;
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
};

module.exports = authService;
