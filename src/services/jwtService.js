const jwt = require("jsonwebtoken");

const jwtService = {
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "10s",
    });
  },
  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  },
};

module.exports = jwtService;
