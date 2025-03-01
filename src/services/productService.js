
const productRepository = require("../repositories/productRepository")

class ProductService {

    async getAllProducts(){
        const data = await productRepository.getAllProducts();
        return {message: "Products fetched successfully", data };
    }

    async getProductById(productId){
        return await productRepository.getProductById(productId);
    }
    async getProductsByCategory(category){
        return await productRepository.getProductsByCategory(category);
    }
    async getTopSellingProduct(){
        return await productRepository.getTopSellingProducts();
    }
    
    async createProduct(productData){
        if (productData.discountPercentage < 0 || productData.discountPercentage > 100) {
            throw new Error("Discount percentage must be between 0 and 100.");
          } 
          productData.discountedPrice = productData.price * (1 - productData.discountPercentage/100);
          
        return await productRepository.createProduct(productData);
    }
    async updateProductRating(productId, Rating){
        return await productRepository.updateProductRating(productId,Rating);
    }
    async updateProduct(productId,productData){
        return await productRepository.updateProduct(productId,productData);
    }
    async deleteProduct(productId){
        return await productRepository.deleteProduct(productId)
    }
    async updateDiscount(productId,discountPercentage){
       
        if(discountPercentage < 0 || discountPercentage >100) {
            throw new Error("Discount percentage must be between 0 and 100.");
        }
        const product = await productRepository.getProductById(productId);
        if(!product) {
            throw new Error ("Product not found");
        }

        product.discountPercentage = discountPercentage;
        product.discountedPrice = product.price * (1 - discountPercentage/100);
        
        console.log(discountPercentage);
        return await productRepository.updateProduct(productId, product);
    }
}
module.exports = new ProductService();