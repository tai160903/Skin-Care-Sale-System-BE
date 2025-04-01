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
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      for (const item of orderItems) {
        const product = await Product.findOneAndUpdate(
          { _id: item.product_id, stock: { $gte: item.quantity } }, // Kiểm tra tồn kho
          { $inc: { stock: -item.quantity, purchaseCount: item.quantity } },
          { session, new: true }
        );
  
        if (!product) {
          throw new Error(`Sản phẩm ${item.product_id} không đủ hàng!`);
        }
      }
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(error.message);
    }
  }
  async checkStockAvailability(orderItems) {
    for (const item of orderItems) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        throw new Error(`không tìm ${item.product_id} `);
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `sản phẩm "${product.name}" đã tạm thời hết hàng`
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
      throw new Error("lỗi khi tạo sản phẩm : " + error.message);
    }
  }
  //async Getby

  async getProductById(productId) {
    try {
      return await Product.findById(productId)
      .populate([
        "skinType",
        "category"
      ]);
    } catch (error) {
      throw new Error("lỗi lấy sản phẩm: " + error.message);
    }
  }

  async updateProduct(productId, productData) {
    try {
      return await Product.findByIdAndUpdate(productId, productData, {
        new: true,
      });
    } catch (error) {
      throw new Error("cập nhật sản phẩm thất bại " + error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error("lỗi khi xóa sản phẩm : " + error.message);
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
      throw new Error(`không tìm thấy sản phẩm của ${category}`);
    }
    return products;
  }
  async updateDisable(productId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error("không tìm thấy sản phẩm");

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
