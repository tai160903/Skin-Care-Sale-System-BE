const ReviewController = require("../controllers/reviewController")
const express = require("express");
const router = express.Router();

router.get("/product/:productId", ReviewController.getReviewsByProductId);
router.post("/",ReviewController.CreateReview);
router.put("/update-rating/:id",ReviewController.updateRating);
router.delete("/:id",ReviewController.deleteReview);
router.get("/:id", ReviewController.getReviewById)
router.get("/",ReviewController.getAllReview);
module.exports = router;