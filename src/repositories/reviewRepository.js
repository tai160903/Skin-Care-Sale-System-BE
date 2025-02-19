const Review = require("../models/review");

class ReviewRepository{

    async getAllReview(){
        try{
            return await Review.find();
        } catch(error){
            throw new Error('Error fetching reviewsreviews: ' + error.message);
        }
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
    async updateRating(id, rating, comment){
        try {
            return await Review.findByIdAndUpdate(
                id,
                {rating : rating, comment : comment})
        } catch(errorerror) {
            throw new Error('Error fetching reviews' + erroror.message);
        }
    }
    async deleteReview(id){
        try {
            return await Review.findByIdAndDelete(id);
        } catch(error) {
            throw new Error('Error fetching reviews' + error.message);
        }
    } 
}
module.exports = new ReviewRepository(); 