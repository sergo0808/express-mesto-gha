const Card = require("../models/card");
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(404).send({ message: err.message }));
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
  Card.findByIdAndRemove(req.params.cardId).then((card) =>
    res.status(200).send(card)
  );
};

const likeCard = (req, res) => {
  console.log(req.user._id);
  console.log(req.params.cardId);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST_CODE).send({ message: err.name });
        return;
      } else {
        res.status(NOT_FOUND_CODE).send({ message: err.name });
        return;
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(SERVER_ERROR_CODE).send({ message: err.message })
    );
};

module.exports = { createCard, deleteCard, getCards, likeCard, dislikeCard };
