import type { Request, Response } from 'express';
import { updateAnalytics } from './post.service.js';
import get from '../GET/index.js';

export async function handleUpdateAnalytics(req: Request, res: Response) {
  try {
    const { data, fingerprint, initial } = req.body;
    const owner = Number(initial.clientID);

    // Update analytics in database
    await updateAnalytics(fingerprint, data, owner);

    res.json({ message: 'success', data });
  } catch (error) {
    console.error('Error processing analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
