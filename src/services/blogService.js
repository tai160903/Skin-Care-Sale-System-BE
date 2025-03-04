const BlogRepository = require("../repositories/blogRepository");

const BlogService = {
  async createBlog(blogdata) {
    const blog = await BlogRepository.createBlog(blogdata);
    return {
      message: "Blog created successfully",
      data: blog,
    };
  },
  async updateBlog(id, blogdata) {
    return await BlogRepository.updateBlog(id, blogdata);
  },
  async deleteBlog(id) {
    return await BlogRepository.deleteBlog(id);
  },
  async findbyId(id) {
    return await BlogRepository.findById(id);
  },
  async findAll() {
    return await BlogRepository.findAll();
  },
};
module.exports = BlogService;
