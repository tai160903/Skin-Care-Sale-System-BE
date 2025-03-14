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
      if (q.trim()) filter.name = { $regex: q, $options: "i" };
      if (category) filter.category = category;
      if (!isNaN(minPrice) || !isNaN(maxPrice)) {
        filter.price = {};
        if (!isNaN(minPrice)) filter.price.$gte = parseFloat(minPrice);
        if (!isNaN(maxPrice)) filter.price.$lte = parseFloat(maxPrice);
      }

      const validSortFields = ["name", "price", "createdAt"];
      const sortOptions = validSortFields.includes(sortBy)
        ? { [sortBy]: -1 }
        : { createdAt: -1 };

      const pageNum = Number(page) || 1;
      const limitNum = Number(limit) || 10;

      const totalProducts = await productRepository.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / limitNum);

      const data = await productRepository.getAllProducts(
        filter,
        sortOptions,
        pageNum,
        limitNum
      );

      return {
        message: "Products fetched successfully",
        data,
        page: pageNum,
        limit: limitNum,
        totalPages,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error(`Error fetching products: ${error.message}`);
    }
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
