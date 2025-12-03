import dotenv from 'dotenv';
dotenv.config();
export default {
  DB_URL: process.env.DB_URL,
  DB_ANON: process.env.DB_ANON,
  OPEN_ROUTER: process.env.OPEN_ROUTER,
  PORT: process.env.PORT,
};
