const productService = require("../services/productService");

class ProductController {
  async getAllProduct(req, res) {
    try {
      console.log(req.query);
      const products = await productService.getAllProducts(req.query);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createProduct(req, res) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getProductsByCategory(req, res) {
    try {
      const products = await productService.getProductsByCategory(
        req.params.category
      );
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getTopSellingProducts(req, res) {
    try {
      const products = await productService.getTopSellingProduct();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const updateProduct = await productService.updateProduct(
        req.params.id,
        req.body
      );

      if (!updateProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateDisableProduct(req, res) {
    try {
      const updateProduct = await productService.updateDisable(req.params.id);
      if (!updateProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deleteProduct = await productService.deleteProduct(req.params.id);
      if (!deleteProduct) {
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDiscount(req, res) {
    try {
      const UpdateDiscount = await productService.updateDiscount(
        req.params.id,
        req.body.discountPercent
      );
      res.status(200).json(UpdateDiscount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
module.exports = new ProductController();
