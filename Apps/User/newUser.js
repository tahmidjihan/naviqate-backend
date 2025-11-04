const newUser = (req, res) => {
  //   const { name = 'John Doe', age = 30 } = req.body;
  res.json({ message: 'User created', status: 201 });
};
module.exports = newUser;
