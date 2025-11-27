import express from 'express';
import { postInbox } from './Functions/inbox';
const router = express.Router();

// Define your API routes here
router.get('/', (req, res) => {
  res.send('API routes');
});
router.post('/inbox', async (req, res) => {
  const { inbox_id, data } = req.body;
  const result = await postInbox(inbox_id, data);
  res.json(result);
});

export default router;
