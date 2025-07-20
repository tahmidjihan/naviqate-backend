import express from 'express';
import { getUsers } from './Functions/getUsers.js';
import { CreateUsers } from './Functions/createUsers.js';

const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//middleware --
const auth = (req, res, next) => {
  verifyToken(req, res, next);
  next();
};
app.use(express.json());
//
// --Users Part---
//
app.post('/createUser', async (req, res) => {
  const { name, email } = req.query;
  const returnVal = await CreateUsers(name, email);
  console.log(returnVal);
  res.send(returnVal);
});
app.get('/getUsers', async (req, res) => {
  const returnVal = await getUsers();
  // console.log(returnVal);
  res.send(returnVal);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
