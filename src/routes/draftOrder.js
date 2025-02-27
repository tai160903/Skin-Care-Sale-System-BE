const express = require("express");
const DraftOrderController = require("../controllers/darftOrderController");

const router = express.Router();

router.get("/:customerId", DraftOrderController.getDraftOrderByCustomerId);
// router.post("/:customerId", DraftOrderController.creatDraftOrder);
router.post("/apply-promotion", DraftOrderController.applyPromotion);

module.exports = router;
