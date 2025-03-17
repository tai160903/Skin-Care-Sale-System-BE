const Category = require("../models/category");

const CategoryRepository = {
    async getAllCategories() {
        const categories = await Category.find();
        return categories;
    },    
    async getCategoryById(id) {
        const category = await Category.findById(id);
        return category;
    },        
    async createCategory(category) {
        const newCategory = await Category.create(category);
        return newCategory;
    },    
    async updateCategory(id, category) {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true });
        return updatedCategory;
    },    
    async deleteCategory(id) {
        const deletedCategory = await Category.findByIdAndRemove(id);
        return deletedCategory;
    }   
    }
module.exports = CategoryRepository;