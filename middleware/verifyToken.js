const JWT = require("jsonwebtoken");

const Middleware = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.body.headers["x-access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    JWT.verify(token, process.env.TOKEN_KEY);
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
module.exports = { Middleware };
