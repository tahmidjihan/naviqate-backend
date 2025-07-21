import express from 'express';
import { getUsers } from './Functions/getUsers.js';
import { CreateUsers } from './Functions/createUsers.js';
import { createCompany } from './Functions/createCompany.js';
import { getUser } from './Functions/getUser.js';
// import { createToken, isTokenValid } from './Functions/JwtInit.js';

const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//middleware --
const auth = (req, res, next) => {
  // isTokenValid(req, res, next);
  next();
};
app.use(express.json());
//
// --Users Part---
//
app.post('/createUser', async (req, res) => {
  const { name, email, token } = req.query;
  const returnVal = await CreateUsers(name, email);
  // const jwtToken = await createToken(token);
  console.log(token);
  res.send('status:', returnVal);
});
app.get('/getUsers', async (req, res) => {
  const returnVal = await getUsers();
  // console.log(returnVal);
  res.send(returnVal);
});
app.get('/getUser/:id', auth, async (req, res) => {
  const { id } = req.params;
  const returnVal = await getUser(id);
  res.send(returnVal);
});
//
//create company---
//
app.post('/createCompany', async (req, res) => {
  const { name, email, created_by } = req.query;
  const returnVal = await createCompany(name, email, created_by);
  console.log(returnVal);
  res.send(returnVal);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
