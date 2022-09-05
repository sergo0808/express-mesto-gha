const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  userValidate,
  userIdValidate,
  avatarValidate,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/:userId', userIdValidate, getUser);
router.patch('/users/me', userValidate, updateUser);
router.patch('/users/me/avatar', avatarValidate, updateAvatar);

module.exports = router;
