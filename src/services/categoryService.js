const CategoryRepository = require("../repositories/categoryRepository");

const CategoryService = {
  getAllCategories: async () => {
    return await CategoryRepository.getAllCategories();
  },
  getCategoryById: async (id) => {
    const { error } = getByIdCategorySchema.validate(id);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return await CategoryRepository.getCategoryById(id);
  },
  createCategory: async (category) => {
    const { error } = createCategorySchema.validate(category);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return await CategoryRepository.createCategory(category);
  },
  updateCategory: async (id, category) => {
    const { error } = updateCategorySchema.validate(category);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return await CategoryRepository.updateCategory(id, category);
  },
  deleteCategory: async (id) => {
    const { error } = deleteCategorySchema.validate(id);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return await CategoryRepository.deleteCategory(id);
  },
};
module.exports = CategoryService;
