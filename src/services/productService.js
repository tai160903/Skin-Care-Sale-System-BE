const productRepository = require("../repositories/productRepository");

class ProductService {
  async getAllProducts(query) {
    try {
      const {
        q = "",
        category,
        minPrice,
        maxPrice,
        sortBy,
        page = "1",
        limit = "10",
      } = query;

      const filter = {};

      if (q) {
        filter.name = { $regex: q, $options: "i" };
      }

      if (category) {
        filter.category = category;
      }

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      const options = {
        sort: sortBy
          ? { [sortBy.replace("-", "")]: sortBy.startsWith("-") ? -1 : 1 }
          : { createdAt: -1 },
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        populate: ["category", "skinType"],
      };

      const totalProducts = await productRepository.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / options.limit);

      const data = await productRepository.getAllProducts(filter, options);


      return {
        message: "Products fetched successfully",
        page: options.page,
        limit: options.limit,
        totalPages,
        data: data,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }
  async updateDisable(productId) {
    return await productRepository.updateDisable(productId);
  }

  async getProductById(productId) {
    return await productRepository.getProductById(productId);
  }
  async getProductsByCategory(category) {
    return await productRepository.getProductsByCategory(category);
  }
  async getTopSellingProduct() {
    return await productRepository.getTopSellingProducts();
  }

  async createProduct(productData) {
    return await productRepository.createProduct(productData);
  }
  async updateProductRating(productId, Rating) {
    return await productRepository.updateProductRating(productId, Rating);
  }
  async updateProduct(productId, productData) {
    return await productRepository.updateProduct(productId, productData);
  }
  async deleteProduct(productId) {
    return await productRepository.deleteProduct(productId);
  }
  // async updateDiscount(productId,discountPercentage){

  //     if(discountPercentage < 0 || discountPercentage >100) {
  //         throw new Error("Discount percentage must be between 0 and 100.");
  //     }
  //     const product = await productRepository.getProductById(productId);
  //     if(!product) {
  //         throw new Error ("Product not found");
  //     }

  //     product.discountPercentage = discountPercentage;
  //     product.discountedPrice = product.price * (1 - discountPercentage/100);

  //     return await productRepository.updateProduct(productId, product);
  // }
}
module.exports = new ProductService();
