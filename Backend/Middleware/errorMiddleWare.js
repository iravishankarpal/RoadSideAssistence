const notFound = (req, res, next) => {
  next({
    msg: `${req.method}  ${req.originalUrl} not found`,
    status: 404,
  });
};

const { validationResult } = require("express-validator");
const throwValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      msg: errors.array().map((error) => error.msg)[0],
      status: 400,
    });
  } else {
    next();
  }
};

module.exports = { notFound, throwValidationErrors };
