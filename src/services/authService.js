const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const sendEmail = require("../utils/sendEmail");
const jwtService = require("../services/jwtService");
const userRepository = require("../repositories/userRepository");
const customerRepository = require("../repositories/customerRepository");
const {
  registerSchema,
  loginSchema,
  sendEmailVerifySchema,
  verifyEmailSchema,
  resetPasswordSchema,
  verifyResetPasswordSchema,
  changePasswordSchema,
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
      const existingUser = await userRepository.findByEmail(email);

      if (existingUser) {
        return { message: "Email already exists", status: 400 };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userRepository.create({
        email,
        password: hashedPassword,
      });
      await customerRepository.create({ user: newUser._id });

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
        tokenVerify: newUser.tokenVerify,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  login: async ({ email, password }) => {
    console.log(email, password);

    const { error } = loginSchema.validate({ email, password });
    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const user = await userRepository.findByEmail(email);
      console.log(user);
      if (!user) {
        return { message: "User not found", status: 400 };
      }

      if (!user.isVerify) {
        return { message: "Please verify your email", status: 400 };
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      console.log(isPasswordMatch);
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
      const customer = await customerRepository.getCustomerIdByUserId(user._id);
      return {
        message: "Login successfully",
        status: 200,
        accessToken,
        refreshToken,
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        customer,
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

  changePassword: async (id, token, req) => {
    const { newPassword, confirmNewPassword } = req;
    const { error } = changePasswordSchema.validate({
      id,
      token,
      newPassword,
      confirmNewPassword,
    });
    if (error) return { message: error.details[0].message, status: 400 };
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        return { message: "User not found", status: 404 };
      }
      if (user.tokenResetPassword !== token) {
        return { message: "Invalid link", status: 400 };
      }

      if (newPassword !== confirmNewPassword) {
        return { message: "Passwords do not match", status: 400 };
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await userRepository.updateById(id, {
        password: hashedPassword,
        tokenResetPassword: null,
      });
      return { message: "Password changed successfully", status: 200 };
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
      await userRepository.updateById(userId, { tokenVerify: newToken });
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
      const user = await userRepository.findById(id);

      if (!user || user.tokenVerify !== tokenVerify) {
        return { message: "Invalid link", status: 400 };
      }

      if (user.isVerify) {
        return { message: "Email already verified", status: 400 };
      }

      await userRepository.updateById(id, {
        tokenVerify: null,
        isVerify: true,
      });

      await customerRepository.create({ user: user._id });

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
      const user = await userRepository.findByEmail(email);

      if (!user) {
        return { message: "User not found", status: 400 };
      }

      const token = randomstring.generate({
        length: 32,
        charset: "hex",
      });

      await userRepository.updateById(user._id, { tokenResetPassword: token });

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
      const user = await userRepository.findById(userId);

      if (!user || user.tokenResetPassword !== token) {
        return { message: "Invalid link", status: 400 };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await userRepository.updateById(userId, {
        tokenResetPassword: null,
        password: hashedPassword,
      });

      return {
        message: "Password updated successfully",
        status: 200,
      };
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  },

  changePasswordByOldPassword: async (
    userId,
    oldPassword,
    newPassword,
    confirmNewPassword
  ) => {
    const { error } = changePasswordByOldPasswordSchema.validate({
      userId,
      oldPassword,
      newPassword,
      confirmNewPassword,
    });
    if (error) return { message: error.details[0].message, status: 400 };

    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        return { message: "User not found", status: 404 };
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return { message: "Incorrect old password", status: 400 };
      }

      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return {
          message: "New password must be different from the old password",
          status: 400,
        };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRepository.updateById(userId, { password: hashedPassword });

      return { message: "Password updated successfully", status: 200 };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  },
};

module.exports = authService;
