import express from 'express';
const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/createUsers', (req, res) => {
  const { name, email } = req.query;
  CreateUsers(name, email)
    .then((result) => {
      res.send('user created succesfully');
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get('/getUsers', (req, res) => {
  getUsers()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
