import Express from 'express';
import { ask } from './functions/openrouter.js';

const router = Express.Router();

router.get('/', async (req: Express.Request, res: Express.Response) => {
  res.send('HoldMyTea routes are working!');
});
router.post('/ask', ask);
export default router;
