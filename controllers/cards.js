const Card = require("../models/card");
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      res
        .status(SERVER_ERROR_CODE)
        .send({ message: `Ошибка сервера, ${err.message}` });
    });
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_CODE).send({
          message: `Переданы некорректные данные в методы создания карточки, ${err.message}`,
        });
      } else {
        res
          .status(SERVER_ERROR_CODE)
          .send({ message: `Ошибка сервера, ${err.message}` });
      }
    });
};
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error(`Карточка с id: ${cardId} не найдена`);
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST_CODE).send({
          message: `Передан некорректны id: ${cardId} в методы удаления карточки ${err.message}`,
        });
      } else if (err.name === "NotFoundError") {
        res.status(NOT_FOUND_CODE).send({
          message: `${err.message}`,
        });
      } else {
        res
          .status(SERVER_ERROR_CODE)
          .send({ message: `Ошибка сервера, ${err.message}` });
      }
    });
};
const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new Error(`Карточка с id: ${cardId} не найдена`);
    })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST_CODE).send({
          message: `Передан некорректный id: ${cardId} в методы постановки лайка карточки, ${err.message}`,
        });
      } else if (err.name === "NotFoundError") {
        res.status(NOT_FOUND_CODE).send({
          message: `${err.message}`,
        });
      } else {
        res
          .status(SERVER_ERROR_CODE)
          .send({ message: `Ошибка сервера, ${err.message}` });
      }
    });
};
const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new Error(`Карточка с id: ${cardId} не найдена`);
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST_CODE).send({
          message: `Передан некорректны id: ${cardId} в методы удаления лайка с карточки ${err.message}`,
        });
      } else if (err.name === "NotFoundError") {
        res.status(NOT_FOUND_CODE).send({
          message: `${err.message}`,
        });
      } else {
        res
          .status(SERVER_ERROR_CODE)
          .send({ message: `Ошибка сервера, ${err.message}` });
      }
    });
};

module.exports = { createCard, deleteCard, getCards, likeCard, dislikeCard };
