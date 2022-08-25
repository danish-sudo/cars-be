const userService = require("../services/UserService");
const BCRYPT = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { totalCars } = require("../services/CarService");
const { sendEmail } = require("../services/EmailService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const pass = await generatePassword();
    req.body.password = await BCRYPT.hash(pass, 10);

    sendEmail(req.body.email, pass);
    const user = await userService.createUser(req.body);
    res.json({ success: true });
  } catch (err) {
    res.json({ error: err, success: false });
  }
};
const generatePassword = async () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};
exports.loginUser = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    const validPassword = await BCRYPT.compare(
      req.body.password,
      user.password
    );

    if (validPassword) {
      const token = JWT.sign(
        {
          email: user.email,
        },
        process.env.TOKEN_KEY,
        {
          algorithm: "HS256",
          expiresIn: "18h",
        }
      );
      const total = await totalCars();
      res.json({ data: user, success: true, token, totalCars: total });
    } else {
      res.json({ error: 403, success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err.code, success: false });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
