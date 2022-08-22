const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const bodyParser = require("body-parser");
const NOT_FOUND_CODE = 404;

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.user = {
    _id: "62fab3fb6b6ff6be07b9f902", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  app.use("/", userRouter);
  app.use(cardRouter);
  app.use("*", (req, res) => {
    res.status(NOT_FOUND_CODE).send({ message: "Страница не найдена" });
  });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
