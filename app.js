const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login, getUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(errors());
app.use(error);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.get('/users/me', getUser);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
