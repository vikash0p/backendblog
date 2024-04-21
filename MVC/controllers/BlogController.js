import Blog from "../models/blogSchema.js"



//create blog
export const createBlog = async (req, res) => {
    const { title, des, img, tags, author } = req.body;
    try {
            const newBlog = await Blog.create({ title, des, img, tags, author });
            res.status(201).json({ message: "Blog created successfully", success: true, data: newBlog });

    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });

    }

}
//get all blogs
export const getAll = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ message: "Blogs fetched successfully", success: true, data: blogs });
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
    }

}

//get single blog
export const getBlogById = async (req, res) => {

    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found", success: false });
        } else {
            res.status(200).json({ message: "Blog fetched successfully", success: true, data: blog });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
    }

}

//update blog
export const updateBlog = async (req, res) => {
    const{id}=req.params;
    const { title, des, img, tags, author } = req.body;

    try {
        const blog = await Blog.findByIdAndUpdate(id, { title, des, img, tags, author }, { new: true });
        if (!blog) {
            res.status(404).json({ message: "Blog not found", success: false });
        } else {
            res.status(200).json({ message: "Blog updated successfully", success: true, data: blog });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
    }
 }


//delete blog
export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            res.status(404).json({ message: "Blog not found", success: false });
        } else {
            res.status(200).json({ message: "Blog deleted successfully", success: true });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
    }
 }