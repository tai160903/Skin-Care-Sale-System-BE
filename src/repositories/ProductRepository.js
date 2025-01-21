const Product = require("../models/product")

class ProductRepository {

    async getAllProducts(){
        try {
            return await Product.find(); 
        } catch(error){
            throw new Error('Error fetching products: ' + error.message);
        }
      }
    async createProduct(productData){
        try {
            const newProduct = new Product(productData)
        } catch(error){
            throw new Error('Error create product: ' + error.message);
        }
      }

      async getProductById(productId){
        try {
            return await Product.findById(productId);

        } catch(error){
            throw new Error('Error fetching product by Id: ' + error.message);
        }
      }
      
      async updateProduct(productId, productData){
        try {
            return await Product.findByIdAndUpdate(productId,productData,{new:true});
        } catch(error){
            throw new Error('Error update product: ' + error.message);
        }
      }

    async deleteProduct(productId){
        try{
            return await Product.findByIdAndDelete(productId);
        } catch(error){
            throw new Error('Error delete product: ' + error.message);
        }
      }
}

module.exports = new ProductRepository();