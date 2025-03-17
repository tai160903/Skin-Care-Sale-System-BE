const CategoryRepository = require("../repositories/categoryRepository");

const CategoryService = {
  getAllCategories: async () => {
    return await CategoryRepository.getAllCategories();
  },
  getCategoryById: async (id) => {
    return await CategoryRepository.getCategoryById(id);
  },
  createCategory: async (category) => {
    return await CategoryRepository.createCategory(category);
  },
  updateCategory: async (id, category) => {
    return await CategoryRepository.updateCategory(id, category);
  },
  deleteCategory: async (id) => {
    return await CategoryRepository.deleteCategory(id);
  },
};

module.exports = CategoryService;
