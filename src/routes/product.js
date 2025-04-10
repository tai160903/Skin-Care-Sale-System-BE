
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/getAll",productController.getAll);
router.get("/top-sell",productController.getTopSellingProducts);
router.get("/:id", productController.getProductById);
router.post("/",productController.createProduct);
router.put("/disable-product/:id",productController.updateDisableProduct);
router.put("/:id", productController.updateProduct);
router.put("/updateDiscount/:id",productController.updateDiscount);
router.delete("/:id", productController.deleteProduct)
router.get("/category/:category",productController.getProductsByCategory)
router.get("/", productController.getAllProduct);

module.exports = router;