const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skinType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkinType",
    },
    name: {
      type: String,
      default: "",
    },
    gender: {
      type: Boolean,
      default: false,
    }
    ,
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    point: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: "customers",
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
