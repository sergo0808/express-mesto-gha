const User = require("../models/user");

const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

const getUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new Error("Пользователь не найден");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST_CODE).send({ message: err.message });
        return;
      }
      if (err.name === "Error") {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
        return;
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(SERVER_ERROR_CODE).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(BAD_REQUEST_CODE).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(BAD_REQUEST_CODE).send({ message: err.message })
    );
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(BAD_REQUEST_CODE).send({ message: err.message })
    );
};

module.exports = { createUser, getUser, getUsers, updateUser, updateAvatar };
