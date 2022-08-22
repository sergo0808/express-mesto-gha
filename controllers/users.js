const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");
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
        res.status(BAD_REQUEST_CODE).send({
          message: `Передан некорректный id пользователя, ${err.message}`,
        });
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
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: `Ошибка сервера, ${err.message}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_CODE).send({
          message: `Переданы некорректные данные в методы создания пользователя, ${err.message}`,
        });
      } else {
        res
          .status(SERVER_ERROR_COD)
          .send({ message: `Ошибка сервера, ${err.message}` });
      }
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
    .orFail(() => {
      throw new NotFoundError(`пользователь c id: ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_CODE).send({
          message: `Переданы некорректные данные в методы обновления профиля, ${err.message}`,
        });
      } else if (err.name === "NotFoundError") {
        res.status(NOT_FOUND_CODE).send({ message: `${err.message}` });
      } else {
        res
          .status(SERVER_ERROR_CODE)
          .send({ message: `Ошибка сервера, ${err.message}` });
      }
    });
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
    .orFail(() => {
      throw new NotFoundError(`Пользователь с id: ${req.user._id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_CODE).send({
          message: `Переданы некорректные данные в методы обновления аватара пользователя ${err.message}`,
        });
      } else if (err.name === "NotFoundError") {
        res.status(NOT_FOUND_CODE).send({ message: `${err.message}` });
      } else {
        res
          .status(SERVER_ERROR_CODE)
          .send({ message: `Ошибка сервера, ${err.message}` });
      }
    });
};

module.exports = { createUser, getUser, getUsers, updateUser, updateAvatar };
