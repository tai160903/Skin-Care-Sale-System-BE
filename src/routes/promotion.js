const express = require("express");
const PromotionController = require("../controllers/promotionController");

const router = express.Router();

router.get("/", PromotionController.getAllPromotions);
router.get("/:id", PromotionController.getPromotionById);
router.post("/", PromotionController.createPromotion);
router.put("/:id", PromotionController.updatePromotion);
router.delete("/:id", PromotionController.deletePromotion);

module.exports = router;
