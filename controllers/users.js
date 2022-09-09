const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../NotFoundErrors');
const ConflictError = require('../ConflictErrors');
const BadRequestError = require('../BadRequestError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.statusCode(200).send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(`Пользователь c id: ${userId} не найден`);
    })
    .then((user) => {
      res.send({
        _id: user.id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id пользователя'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError(`Пользователь c id: ${userId} не найден`));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,

    }))

    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные в методы создания пользователя',
          ),
        );
      } else if (err.code === 11000) {
        next(
          new ConflictError(
            'Пользователь с таким электронным адресом уже существует',
          ),
        );
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError(`пользователь c id: ${req.user._id} не найден`);
    })
    .then((user) => {
      res.send({ name: user.name, about: user.about });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные в методы обновления профиля',
          ),
        );
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError(`Пользователь c id: ${req.user._id} не найден`));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError(`Пользователь с id: ${req.user._id} не найден`);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные в методы обновления аватара пользователя',
          ),
        );
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError(`Пользователь c id: ${req.user._id} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, getUser, getUsers, updateUser, updateAvatar, login,
};
