export const logTime = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

export const logMethod = (req, res, next) => {
  console.log("Method: ", req.method);
  next();
};
