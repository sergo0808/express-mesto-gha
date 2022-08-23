const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const NOT_FOUND_CODE = 404;

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '62fab3fb6b6ff6be07b9f902', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use('/', userRouter);
app.use(cardRouter);
app.use('*', (_, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
