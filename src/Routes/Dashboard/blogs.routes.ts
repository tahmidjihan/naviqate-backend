import express from 'express';
import {
  getBlogById,
  getBlogs,
  insertBlog,
} from './functions/blogs.controller.js';
const router = express.Router();

// Define your dashboard routes here
router.get('/', (req, res) => {
  res.send('Welcome to the Dashboard!');
});

router.get('/:email', async (req, res) => {
  const email = req.params.email;
  const data = await getBlogs(email);
  res.json(data);
});
router.get('/:email/:id', async (req, res) => {
  const email = req.params.email;
  const id = parseInt(req.params.id);
  const data = await getBlogById(email, id);
  res.json(data);
});
router.post('/', async (req, res) => {
  const blogData = req.body;
  const data = await insertBlog(blogData);
  res.json(data);
});
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const blogData = req.body;
  //   const data = updateBlog(id, blogData);
  //   res.json(data);
});
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  //   const data = deleteBlog(id);
  //   res.json(data);
});

export default router;
