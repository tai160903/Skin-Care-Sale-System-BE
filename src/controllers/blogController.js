const BlogService = require("../services/blogService");

const BlogController = {
    async createBlog(req,res){
        try{
        const Blog = await BlogService.createBlog(req.body);
        res.status(201).json(Blog);
        }catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    async updateBlog(req,res){
        try{
            const updateBlog = await BlogService.updateBlog(req.params.id,req.body);
            res.status(200).json(updateBlog);
        }catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deleteBlog(req,res){
        try{
           const deleteBlog = await BlogService.deleteBlog(req.params.id);
           if(!deleteBlog){
           }
           res.status(200).json({ message: "Blog deleted successfully" });
        }catch(error) {
            res.status(500).json({ message: error.message });
        }
    },
    async findBlogById(req,res){
        try{
        const blog = await BlogService.findbyId(req.params.id);
        res.status(200).json(blog);
    }catch(error) {
        res.status(500).json({ message: error.message });
    }
    },
    async FindAllBlog(req,res){
        try{
            const blogs = await BlogService.findAll();
            res.status(200).json(blogs);
        }catch(error) {
            res.status(500).json({ message: error.message });
        }
    }
}









module.exports = BlogController