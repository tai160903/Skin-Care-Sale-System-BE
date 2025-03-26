const Review = require("../models/review");

class ReviewRepository{

    async getAllReview(){
        try{
            return await Review.find().populate("customer_id", "name email") 
            .populate("product_id", "name price image"); ;
        } catch(error){
            throw new Error('lỗi khi lấy danh sách đánh giá: ' + error.message);
        }
      }
    
    getReviewsByProductId(productId) {
        return Review.find({ product_id: productId }).populate("customer_id", "name email") 
        .populate("product_id", "name price image"); 
        ;
    }


    async CreateReview ( reviewData){
        try {
            const newReview = await Review.create({
                customer_id :reviewData.customer_id,
                product_id: reviewData.product_id,
                rating : reviewData.rating,
                comment : reviewData.comment });
            const populatedReview = await Review.findById(newReview._id)
                .populate("customer_id", "name email") 
                .populate("product_id", "name price image"); 
    
            return populatedReview;
        } catch (error) {
            if (error.code === 11000) {  // Duplicate key error
              throw new Error("Bạn đã đánh giá sản phẩm này!");
            }
            throw error;
          }
        }
    async updateRating(id, Ratingdata){
        try {
            return await Review.findByIdAndUpdate(
                {_id : id},
                {rating : Ratingdata.rating,
                comment : Ratingdata.comment},
                {new : true}).populate("customer_id", "name email") 
                .populate("product_id", "name price image"); 
        } catch(error) {
            throw new Error('Lỗi khi lấy danh sách đánh giá' + error.message);
        }
    }
    async getReviewById(id){
        try{
            return Review.findById(id).populate("customer_id", "name email") 
            .populate("product_id", "name price image"); ;
        }catch(error){
            throw new Error('Lỗi khi lấy danh sách đánh giá' + error.message);
        }
    }
    async deleteReview(id){
        try {
            return await Review.findByIdAndDelete(id);
        } catch(error) {
            throw new Error('Lỗi khi lấy danh sách đánh giá' + error.message);
        }
    } 
    async getReviewsByProductId(productId) {
        return await Review.find({ product_id: productId })
        .populate("customer_id", "name email") 
        .populate("product_id", "name price image"); 
    }
}
module.exports = new ReviewRepository(); 