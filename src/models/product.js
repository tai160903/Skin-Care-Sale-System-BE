const mongoose = require("mongoose");

// Định nghĩa schema cho Product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPercentage: {
      type: Number,
      default :0,
    },

    discountedPrice: {
      type: Number,
      default : 0
    },

    ingredient: {
      type: String, 
      required: false, 
    },
    category: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,  
    },
    image: {
      type: String,
      required: true,  
    },
    rating: {
      type: Number, 
      required: false,
    },
    purchaseCount: {
      type: Number,
      default: 0, 
    },
    description: {
      type: String,
      required: false,  
    },
    isDisabled: {
      type: Boolean,
      default: false,  
    },
  },
  {
    timestamps: true, 
    collection: "products"
  }
);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
