const Product = require("../models/product")

class ProductRepository {

    async getAllProducts(){
        try {
            return await Product.find(); 
        } catch(error){
            throw new Error('Error fetching products: ' + error.message);
        }
      }
      async updateStockAndPurchaseCount(orderItems) {
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(
                item.product_id,
                {
                    $inc: { 
                        purchaseCount: item.quantity, 
                        stock: -item.quantity          
                    }
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
                throw new Error(`Product "${product.name}" is out of stock or insufficient quantity available`);
            }
        }
    }
    
    async updateProductRating(productId, rating){
        return await Product.findByIdAndUpdate(
            productId ,
            {rating : rating},
            {new : true}
        );
    }
    async createProduct(productData){
        try {
            
            const newProduct = new Product(productData)
            return await newProduct.save();
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
      async restoreStockAndPurchaseCount(items) {
        for (let item of items) {
            await Product.updateOne(
                { _id: item.product_id },
                {
                    $inc: {
                        stock: item.quantity, // Hoàn lại stock
                        purchaseCount: -item.quantity // Giảm purchaseCount
                    }
                }
            );
        }
    }
}

module.exports = new ProductRepository();