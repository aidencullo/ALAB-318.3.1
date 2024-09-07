const express = require("express");

const logger = require("./middleware/log");
const errorHandler = require("./utils/error");
const authors = require("./routes/authors");
const books = require("./routes/books");
const publishers = require("./routes/publishers");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "pug");

app.use(logger);

app.use('/authors', authors);
app.use('/books', books);
app.use('/publishers', publishers);

app.use(errorHandler);

module.exports = app;
