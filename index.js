const express = require("express");

const app = express();
const port = 3000;

const logger = require("./middleware/log");
const errorHandler = require("./utils/error");

app.use(logger);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
