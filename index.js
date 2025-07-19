import express from 'express';
const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/createUsers', (req, res) => {
  const { name, email } = req.query;
  CreateUsers(name, email);
});
app.get('/getUsers', (req, res) => {
  getUsers();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
