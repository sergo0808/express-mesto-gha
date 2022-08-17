const router = require("express").Router();
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/users/:_id", getUser);
router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
