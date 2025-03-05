const { updateProductRating } = require("../repositories/ProductRepository");
const ReviewRepository = require("../repositories/reviewRepository")
const ProductService = require("../services/productService")
const ReviewService = {
    async CreateReview(reviewData){
        const data = await ReviewRepository.CreateReview(reviewData);
        await this.updateProductRating(data.product_id);
        return ({message : " Create review successfully", data });

    }, 
    async updateProductRating(productId){
        const reviews = await ReviewRepository.getReviewsByProductId(productId);
        const totalRating = reviews.reduce((acc,review) => acc + review.rating, 0);
        const averageRating = reviews.length ? totalRating/reviews.length : 0;
        await ProductService.updateProductRating(productId,averageRating);
    },

    async updateRating(Id,Ratingdata){
        const data = await ReviewRepository.updateRating(Id,Ratingdata);
        await this.updateProductRating(data.product_id);
        return ({message : "Update rating successfully", data });
    },
    async deleteReview(id){
        return await ReviewRepository.deleteReview(id);
      
    },
    async getAllReview(){
        const data = await ReviewRepository.getAllReview();
        return ({message : "get review successfully", data });
    },
    async getReviewById(id){
        const data = await ReviewRepository.getReviewById(id);
        return ({message : "get review successfully", data });
    },
    async getReviewsByProductId(productId){
        const data = await ReviewRepository.getReviewsByProductId(productId);
        return ({message : "get review successfully", data });
    },

}
module.exports = ReviewService;