const express = require("express");
const BlogController = require("../controllers/blogController");

const router = express.Router();

router.post("/",BlogController.createBlog)
router.get("/:id",BlogController.findBlogById)
router.get("/",BlogController.FindAllBlog)
router.put("/:id",BlogController.updateBlog)
router.delete("/:id",BlogController.deleteBlog)

module.exports = router