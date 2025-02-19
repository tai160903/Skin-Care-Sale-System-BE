const { updateProductRating } = require("../repositories/ProductRepository");
const ReviewRepository = require("../repositories/reviewRepository")
const ProductService = require("../services/productService")
const ReviewService = {
    async CreateReview(reviewData){
        const review = await ReviewRepository.CreateReview(reviewData);
        await this.updateProductRating(review.product_id);
        return review;

    }, 
    async updateProductRating(productId){
        const reviews = await ReviewRepository.getReviewsByProductId(productId);
        const totalRating = reviews.reduce((acc,review) => acc + review.rating, 0);
        const averageRating = reviews.length ? totalRating/reviews.length : 0;
        await ProductService.updateProductRating(productId,averageRating);
    },

    async updateRating(Id,Ratingdata){
        return await ReviewRepository.updateRating(Id,Ratingdata);
    },
    async deleteReview(id){
        return await ReviewRepository.deleteReview(id);
    },
    async getAllReview(){
        return await ReviewRepository.getAllReview();
    },
    async getReviewById(id){
        return await ReviewRepository.getReviewById(id);
    }

}
module.exports = ReviewService;