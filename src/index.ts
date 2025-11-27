import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import envData from './envData.ts';
// import { router } from './routes';
// import userRouter from './Routers/User/user.ts';
const { PORT } = envData;

dotenv.config();

const app = express();
const port = PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// app.use('/user', userRouter);
// // app.get('/user', (req, res) => {
// //   console.log('Hello user!');
// //   res.send('Hello user!');
// // });

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
