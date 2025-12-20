import express from 'express';
import { handleGetAnalyticsByOwner } from './GET/index.js';
import { handleUpdateAnalytics } from './POST/index.js';

const router = express.Router();

// Get analytics by owner email
router.get('/:owner', handleGetAnalyticsByOwner);

// Update/Post analytics
router.post('/', handleUpdateAnalytics);

// Base route info
router.get('/', (req, res) => {
  res.send('Analytics routes');
});

export default router;
