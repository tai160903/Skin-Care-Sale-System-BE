const authService = require("../services/authService");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/jwtService");

class AuthController {
  register = async (req, res) => {
    try {
      const respone = await authService.register(req.body);
      return res.status(201).json(respone);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  login = async (req, res) => {
    try {
      const respone = await authService.login(req.body);
      return res.status(200).json(respone);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  logout = async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  };

  sendOtp = async (req, res) => {
    try {
      const response = await authService.sendOtp(req.body.email);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  verifyOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
      const response = await authService.verifyOtp({ email, otp });
      res.cookie("refreshToken", response.data.refreshToken, {
        httpOnly: true,
      });
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  sendEmailVerify = async (req, res) => {
    try {
      const response = await authService.sendEmailVerify(req.body);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  verifyEmail = async (req, res) => {
    try {
      const { id, tokenVerify } = req.params;
      const response = await authService.verifyEmail({ id, tokenVerify });
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  sendEmailResetPassword = async (req, res) => {
    try {
      const response = await authService.sendEmailResetPassword(req.body.email);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  verifyEmailResetPassword = async (req, res) => {
    try {
      const { userId, token } = req.params;
      const { newPassword, confirmNewPassword } = req.body.data;
      const response = await authService.verifyEmailResetPassword({
        userId,
        token,
        newPassword,
        confirmNewPassword,
      });
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  loginGoogleCallback = async (req, res) => {
    try {
      if (!req.user) {
        return res.json({ message: "Authentication failed" });
      }

      const accessToken = await generateAccessToken({
        _id: req.user.id,
        role: req.user.role,
      });
      const refreshToken = await generateRefreshToken({
        _id: req.user.id,
        role: req.user.role,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });

      res.redirect(`${process.env.CLIENT_URL}?access_token=${accessToken}`);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

module.exports = new AuthController();