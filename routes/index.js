const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { authValidate, registerValidate } = require('../middlewares/validation');
const NotFoundError = require('../NotFoundErrors');

router.post('/signup', registerValidate, createUser);
router.post('/signin', authValidate, login);
// router.get('/signout', signout);

router.use(auth);

router.use(userRouter);
router.use(cardRouter);

router.use(() => {
  throw new NotFoundError('Указан неправильный путь');
});

module.exports = router;
