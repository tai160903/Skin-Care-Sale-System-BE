const Product = require("../models/product");

class ProductRepository {
  async getAllProducts(filter = {}, options = {}) {
    return await Product.find(filter)
    .skip(options?.page * options?.limit - options?.limit)
    .sort(options?.sort)
    .limit(options?.limit)
    .populate(options?.populate);
  }
  async getTopSellingProducts() {
    try {
      return await Product.find().sort({ purchaseCount: -1 }).limit(10);
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }
  async updateStockAndPurchaseCount(orderItems) {
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product_id,
        {
          $inc: {
            purchaseCount: item.quantity,
            stock: -item.quantity,
          },
        },
        { new: true }
      );
    }
  }
  async checkStockAvailability(orderItems) {
    for (const item of orderItems) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        throw new Error(`Product ${item.product_id} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `Product "${product.name}" is out of stock or insufficient quantity available`
        );
      }
    }
  }

  async updateProductRating(productId, rating) {
    return await Product.findByIdAndUpdate(
      productId,
      { rating: rating },
      { new: true }
    );
  }
  async createProduct(productData) {
    try {
      const newProduct = await Product.create(productData);
      await newProduct.save();
      const populatedProduct = await Product.findById(newProduct._id)
    .populate("skinType", "name")
    .populate("category", "name");
      return populatedProduct;
    } catch (error) {
      throw new Error("Error create product: " + error.message);
    }
  }
  //async Getby

  async getProductById(productId) {
    try {
      return await Product.findById(productId)
        .populate("skinType")
        .populate("category");
    } catch (error) {
      throw new Error("Error fetching product by Id: " + error.message);
    }
  }

  async updateProduct(productId, productData) {
    try {
      return await Product.findByIdAndUpdate(productId, productData, {
        new: true,
      });
    } catch (error) {
      throw new Error("Error update product: " + error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error("Error delete product: " + error.message);
    }
  }
  async restoreStockAndPurchaseCount(items) {
    for (let item of items) {
      await Product.updateOne(
        { _id: item.product_id },
        {
          $inc: {
            stock: item.quantity,
            purchaseCount: -item.quantity,
          },
        }
      );
    }
  }
  async getProductsByCategory(category) {
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });
    if (!products || products.length == 0) {
      throw new Error(`not found product with ${category}`);
    }
    return products;
  }
  async updateDisable(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { isDisabled: !product.isDisabled },
      { new: true }
    );

    return updatedProduct;
  }

  async countDocuments() {
    return await Product.countDocuments();
  }
}

module.exports = new ProductRepository();
