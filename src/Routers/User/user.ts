import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Hello user!');
  res.send('Hello user!');
});
const userRouter = router;
export default userRouter;
