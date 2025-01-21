
const productRepository = require("../repositories/ProductRepository");

class ProductService {

    async getAllProducts(){
        return await productRepository.getAllProducts();
    }

    async getProductById(productId){
        return await productRepository.getProductById(productId);
    }

    async createProduct(productData){
        return await productRepository.createProduct(productData);
    }

    async updateProduct(productId,productData){
        return await productRepository.updateProduct(productId,productData);
    }
    async deleteProduct(productId){
        return await productRepository.deleteProduct(productId)
    }
}
module.exports = new ProductService();