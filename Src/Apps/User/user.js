const express = require('express');
const router = express.Router();
const newUser = require('./newUser');

// app.use(express.json());

router.get('/', (req, res) => {
  const demo = {
    name: 'John Doe',
    age: 30,
  };
  res.json(demo);
});
router.get('/new', newUser);
module.exports = router;
