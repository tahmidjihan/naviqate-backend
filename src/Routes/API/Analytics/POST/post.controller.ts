import type { Request, Response } from 'express';
import { mergeAnalytics, updateAnalytics } from './post.service.js';
import get from '../GET/index.js';

export async function handleUpdateAnalytics(req: Request, res: Response) {
  try {
    const { data, fingerprint, initial } = req.body;
    const owner = Number(initial.clientID);

    // Get existing analytics
    const oldData = await get.getAnalyticsByFingerprint(fingerprint);

    // Merge old and new data
    const mergedData = mergeAnalytics(oldData, data);

    // Update analytics in database
    await updateAnalytics(fingerprint, mergedData, owner);

    res.json({ message: 'success', data: mergedData });
  } catch (error) {
    console.error('Error processing analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
