const express = require('express');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const user = require('./Apps/User/user');
app.use('/user', user);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
