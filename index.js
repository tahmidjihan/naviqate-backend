import express from 'express';
import { getUsers } from './Functions/getUsers.js';
import { CreateUsers } from './Functions/createUsers.js';
import { createCompany } from './Functions/createCompany.js';
import { getUser, getUserByEmail } from './Functions/getUser.js';
// import { createToken, isTokenValid } from './Functions/JwtInit.js';
import cors from 'cors';
import { updateUserCompany } from './Functions/updateUserCompany.js';
import { createDatabases } from './Functions/createDatabases.js';
import {
  getDatabasesByCompanyId,
  getDatabases,
} from './Functions/getDatabase.js';

const app = express();
// const cors = cors();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//middleware --
app.use(cors());
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
app.patch('/updateUserCompany', async (req, res) => {
  const { id, company, company_id } = req.query;
  console.log(id, company);
  const returnVal = await updateUserCompany(id, company, company_id);
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
app.get('/getUserByEmail/:email', async (req, res) => {
  const { email } = req.params;
  const returnVal = await getUserByEmail(email);
  res.send(returnVal);
});
//
//-- company---
//
app.post('/createCompany', async (req, res) => {
  // const { name, email, created_by } = req.query;
  const { name, email, created_by } = req.body;
  const returnVal = await createCompany(name, email, created_by);
  console.log(returnVal);
  res.send(returnVal);
});
// -- databases --
//
app.post('/createDatabases', async (req, res) => {
  const { name, company_id } = req.body;
  // console.log(req.body);
  const returnVal = await createDatabases(name, company_id);
  res.send(returnVal);
});
app.get('/getDatabases', async (req, res) => {
  const { id } = req.query;
  const returnVal = await getDatabases(id);
  res.send(returnVal);
});
app.get('/getDatabasesByCompany', async (req, res) => {
  const { company_id } = req.query;
  const returnVal = await getDatabasesByCompanyId(company_id);
  res.send(returnVal);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
