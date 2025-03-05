const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 20,
      required: true,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["customer", "staff", "manager", "admin"],
      default: "customer",
    },
    tokenVerify: {
      type: String,
    },
    tokenResetPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
