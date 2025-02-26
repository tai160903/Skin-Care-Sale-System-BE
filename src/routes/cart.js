const express = require("express");
const CartController = require("../controllers/cartController");

const router = express.Router();

router.post("/add", CartController.addToCart);
router.get("/:customerId", CartController.getCart);
router.post("/clear", CartController.clearCart);
router.post("/apply-promotion", CartController.applyPromotion);
router.put("/remove-item", CartController.removeItem); 
router.put("/update-quantity", CartController.updateQuantity);

module.exports = router;
