const express = require("express");

const app = express();
const port = 3000;

const logger = require("./middleware/log");
const errorHandler = require("./utils/error");

const authors = require("./routes/authors");
const books = require("./routes/books");
const publishers = require("./routes/publishers");

app.use(logger);

app.use('/authors', authors);
app.use('/books', books);
app.use('/publishers', publishers);

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
