import express from 'express'
import { createBlog, deleteBlog, getAll, getBlogById, updateBlog } from '../controllers/BlogController.js';

const route = express.Router();
//create blog
route.post('/create', createBlog);
//get all blog
route.get('/getBlog',getAll);
//get single blog
route.get('/getBlog/:id', getBlogById)
//update blog
route.put('/update/:id', updateBlog)
//delete blog
route.delete('/delete/:id', deleteBlog)

export default route;