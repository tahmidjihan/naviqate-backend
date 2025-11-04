import express from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
// import { router } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// app.use(router);
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
