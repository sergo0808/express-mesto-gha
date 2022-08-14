const router = require("express").Router();
const { createUser } = require("../controllers/users");

// router.get("/user", getUser);
// router.get("/users/:userId", getUsers);
router.post("/users", createUser);

module.exports = router;
