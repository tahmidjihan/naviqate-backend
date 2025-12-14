import express from 'express';
import supabase from '../../../Supabase.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Analytics routes');
});
router.post('/', async (req, res) => {
  // res.send('Analytics routes');
  const data = req.body;
  console.log(data);
  console.log('===================================');
  const { data: analytics, error } = await supabase
    .from('analytics')
    .upsert({ ...data });

  if (error) {
    console.log(error);
  }
  console.log(analytics);
  res.send({ message: 'success' });
});
export default router;
