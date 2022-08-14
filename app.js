const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());
app.use("/", userRouter);
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
