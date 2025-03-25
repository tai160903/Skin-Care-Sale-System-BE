const BlogRepository = require("../repositories/blogRepository");

const BlogService = {
  async createBlog(blogdata) {
    const { error } = createBlogSchema.validate(blogdata);
    if (error) return { message: error.details[0].message, status: 400 };
    const blog = await BlogRepository.createBlog(blogdata);
    return {
      message: "Blog created successfully",
      data: blog,
    };
  },
  async updateBlog(id, blogdata) {
    const { error } = updateBlogSchema.validate(blogdata);
    if (error) return { message: error.details[0].message, status: 400 };
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
