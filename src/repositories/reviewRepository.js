const Review = require("../models/review");

class ReviewRepository{

    async getAllReview(){
        try{
            return await Review.find();
        } catch(error){
            throw new Error('Error fetching reviewsreviews: ' + error.message);
        }
      }
    
    getReviewsByProductId(productId) {
        return Review.find({ product_id: productId });
    }


    async CreateReview ( reviewData){
        try {
            return await Review.create({
                customer_id :reviewData.customer_id,
                product_id: reviewData.product_id,
                rating : reviewData.rating,
                comment : reviewData.comment })
        } catch(error) {
            throw new Error('Error fetching reviews' + error.message);
        }
    }
    async updateRating(id, Ratingdata){
        try {
            return await Review.findByIdAndUpdate(
                {_id : id},
                {rating : Ratingdata.rating,
                comment : Ratingdata.comment},
                {new : true})
        } catch(error) {
            throw new Error('Error fetching reviews' + error.message);
        }
    }
    async getReviewById(id){
        try{
            return Review.findById(id);
        }catch(error){
            throw new Error('Error fetching reviews' + error.message);
        }
    }
    async deleteReview(id){
        try {
            return await Review.findByIdAndDelete(id);
        } catch(error) {
            throw new Error('Error fetching reviews' + error.message);
        }
    } 
    async getReviewsByProductId(productId) {
        return await Review.find({ product_id: productId })
        .populate('product_id')  
        .populate({
            path: 'customer_id',
            select: 'name' 
        }); 
    }
}
module.exports = new ReviewRepository(); 