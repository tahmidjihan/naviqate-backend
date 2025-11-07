import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = process.env.DB_URL;
// const supabaseKey = process.env.DB_ANON;

dotenv.config();
// @ts-ignore
const supabase = createClient(process.env.DB_URL, process.env.DB_ANON);

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Hello user!');
  res.send('Hello user!');
});
router.get('/loginTahmidJihan', async (req, res) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.DEMO_USER,
    password: process.env.DEMO_USER_PASSWORD,
  });
  console.log(data, error);
  res.send(data);
});
const userRouter = router;
export default userRouter;
