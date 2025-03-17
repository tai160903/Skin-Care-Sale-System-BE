const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');


router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.get('/:id', CategoryController.getCategoryById);
router.get('/', CategoryController.getAllCategories);
module.exports = router;