const express = require("express");

const app = express();
const port = 3000;

const { logTime, logMethod } = require("./middleware");

app.use(logTime);
app.use(logMethod);

app.get("/", (req, res, next) => {
  return next(new Error('Error!'))
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
