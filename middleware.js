export const logTime = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

export const logMethod = (req, res, next) => {
  console.log("Method: ", req.method);
  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
}
