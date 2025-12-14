import express from 'express';
import supabase from '../../../Supabase';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Analytics routes');
});
router.post('/', (req, res) => {
  // res.send('Analytics routes');
  const data = req.body;
  supabase.from('analytics').upsert(
    { ...data },
    {
      onConflict: 'fingerprint',
    }
  );

  res.send('Analytics routes');
});
export default router;
