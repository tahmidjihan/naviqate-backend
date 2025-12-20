import type { Request, Response } from 'express';
import get from './get.service.js';

async function handleGetAnalyticsByOwner(req: Request, res: Response) {
  try {
    const { owner } = req.params;
    const { event } = req.query;
    if (!owner || !event) {
      return res.status(400).json({ error: 'Correct parameters is required' });
    }

    const analytics = await get.getAnalytics(owner, event as string);
    res.json({ message: 'success', analytics });
  } catch (error) {
    console.error('Error fetching analytics by owner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default handleGetAnalyticsByOwner;
