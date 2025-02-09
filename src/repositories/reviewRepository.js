const Review = require("../models/review");

class ReviewRepository{

    async getAllReview(){
        try{
            return await Review.find();
        } catch(error){
            throw new Error('Error fetching reviewsreviews: ' + error.message);
        }
      }
}
module.exports = new ReviewRepository(); 