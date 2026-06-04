import express from 'express';
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogComments, getBlogId, togglePublish, generateBlogContent } from '../controllers/BlogController.js';
import upload from '../Middleware/Multer.js';
import auth from '../Middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogId);
blogRouter.post('/delete', auth, deleteBlogById);
blogRouter.post('/toggle-publish', togglePublish);
blogRouter.post('/addComment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate', auth, generateBlogContent);

export default blogRouter;