const Blog = require("../models/blog.js")

const BlogRepository = {
    async createBlog(blogdata){
        return await Blog.create(blogdata);
    },
    async updateBlog(id,blogdata){
        return await Blog.findByIdAndUpdate(
            {_id : id},
            {...blogdata},
            {new : true});
    },
    async deleteBlog(id){
        return await Blog.findByIdAndDelete(id);
    },
    async findById(id){
        return await Blog.findById(id);
    },
    async findAll(){
        return await Blog.find();
    }
}
module.exports = BlogRepository