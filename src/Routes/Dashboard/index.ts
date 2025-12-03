import express from 'express';
// import { getBlogById, getBlogs, insertBlog } from './functions/Blogs';
const router = express.Router();

// Define your dashboard routes here
router.get('/', (req, res) => {
  res.send('Welcome to the Dashboard!');
});
router.use('/blogs', await import('./blogs.routes.js').then((m) => m.default));
router.use(
  '/company',
  await import('./company.routes.js').then((m) => m.default)
);
router.use('/inbox', await import('./inbox.routes.js').then((m) => m.default));

export default router;
