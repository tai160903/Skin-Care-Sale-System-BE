const express = require("express");
const DraftOrderController = require("../controllers/darftOrderController")

const router = express.Router();

router.get("/:customerId", DraftOrderController.getDraftOrderByCustomerId);
router.post("/:customerId", DraftOrderController.creatDraftOrder);

module.exports = router;