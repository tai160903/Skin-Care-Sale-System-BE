const express = require("express");
const PromotionController = require("../controllers/promotionController");

const router = express.Router();

router.post("/customer", PromotionController.createPromotionOfCustomer);
router.post("/", PromotionController.createPromotion);
router.put("/:id", PromotionController.updatePromotion);
router.delete("/:id", PromotionController.deletePromotion);
router.get("/", PromotionController.getAllPromotions);
router.get("/:id", PromotionController.getPromotionById);
router.get(
  "/customer/:customerId",
  PromotionController.getPromotionsByCustomerId
);

module.exports = router;
