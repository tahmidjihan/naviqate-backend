import express from 'express';
import { getAnalytics } from './getAnalytics.js';
import { getAnalyticsByOwner } from './getAnalyticsByOwner.js';
import { mergeAnalytics } from './mergeAnalytics.js';
import { updateAnalytics } from './updateAnalytics.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Analytics routes');
});

// Get analytics by owner email
router.get('/:owner', async (req, res) => {
  try {
    const { owner } = req.params;

    if (!owner) {
      return res.status(400).json({ error: 'Owner email is required' });
    }

    const analytics = await getAnalyticsByOwner(owner);
    res.json({ message: 'success', analytics });
  } catch (error) {
    console.error('Error fetching analytics by owner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { data, fingerprint, initial } = req.body;
    const owner = Number(initial.clientID);

    // Get existing analytics for this fingerprint
    const oldData = await getAnalytics(fingerprint);

    // Merge old and new data with percentage priority
    const mergedData = mergeAnalytics(oldData, data);

    // Update analytics in database with owner
    await updateAnalytics(fingerprint, mergedData, owner);

    res.json({ message: 'success', data: mergedData });
  } catch (error) {
    console.error('Error processing analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
