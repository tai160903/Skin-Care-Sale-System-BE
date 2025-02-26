
const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.get("/top-sell",productController.getTopSellingProducts);
router.get("/:id", productController.getProductById);
router.post("/",productController.createProduct);
router.put("/:id", productController.updateProduct);
router.put("/updateDiscount/:id",productController.updateDiscount);
router.delete("/:id", productController.deleteProduct)
router.get("/category/:category",productController.getProductsByCategory)


module.exports = router;