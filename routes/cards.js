const router = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardValidate, cardIdValidate } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', cardValidate, createCard);
router.delete('/cards/:cardId', cardIdValidate, deleteCard);
router.put('/cards/:cardId/likes', cardIdValidate, likeCard);
router.delete('/cards/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = router;
