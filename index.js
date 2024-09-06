const express = require("express");

const app = express();
const port = 3000;

const {
  logTime,
  logMethod,
  errorHandler,
} = require("./middleware");

app.use(logTime);
app.use(logMethod);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
