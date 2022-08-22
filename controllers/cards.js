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
  const { title, link } = req.body;
  Card.create({ title, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) =>
      res.status(BAD_REQUEST_CODE).send({ message: err.message })
    );
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) =>
    res.send({ data: card })
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
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      res.status(SERVER_ERROR_CODE).send({ message: err.message })
    );
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
