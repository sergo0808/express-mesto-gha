const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:21017/mestodb", {
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
