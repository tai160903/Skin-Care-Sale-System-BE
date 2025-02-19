const ReviewController = require("../controllers/reviewController")
const express = require("express");
const router = express.Router();

router.get("/",ReviewController.getAllReview);
router.post("/",ReviewController.CreateReview);
router.put("/update-rating/:id",ReviewController.updateRating);
router.delete("/:id",ReviewController.deleteReview);
router.get("/:id", ReviewController.getReviewById)

module.exports = router;