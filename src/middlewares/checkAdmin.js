const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[2];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = checkAdmin;
