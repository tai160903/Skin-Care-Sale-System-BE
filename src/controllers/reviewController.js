const { getReviewsByProductId } = require("../repositories/reviewRepository");
const ReviewService = require("../services/reviewService");

const ReviewController = {
  async CreateReview(req, res) {
    try {
      const newReview = await ReviewService.CreateReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      if (error.message === "Bạn đã đánh giá sản phẩm này!") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Something went wrong!", error });
    }
  },

  async getAllReview(req, res) {
    try {
      const reviews = await ReviewService.getAllReview();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updateRating(req, res) {
    try {
      const updateReview = await ReviewService.updateRating(
        req.params.id,
        req.body
      );
      res.status(200).json(updateReview);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async deleteReview(req, res) {
    try {
      const deleteReview = await ReviewService.deleteReview(req.params.id);
      if (!deleteReview) {
      }
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async getReviewById(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getReviewsByProductId(req, res) {
    try {
      console.log(req.params.productId);
      const reviews = await ReviewService.getReviewsByProductId(req.params.productId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};
module.exports = ReviewController;
