import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import envData from './dataOfEnv.js';
import dashboard from './Routes/Dashboard/index.js';
import api from './Routes/API/index.js';
import holdMyTea from './Routes/HoldMyTea/index.js';
// import { router } from './routes';
// import userRouter from './Routers/User/user.ts';
const { PORT } = envData;

// dotenv.config();

const app = express();
const port = PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// ! here is some dangerous code that should be fixed soon
// ? for only dashboard
app.use('/dashboard', dashboard);

// ? for only api and dashboard
app.use('/api', api);

// ? holdMyTea routes

app.use('/holdMyTea', holdMyTea);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
