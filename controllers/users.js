const User = require("../models/user");

const getUser = (req, res) => {};
const getUsers = (req, res) => {};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { createUser };
