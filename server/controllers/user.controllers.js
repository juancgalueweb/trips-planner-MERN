const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Method to create an user
module.exports.registerUser = async (req, res) => {
  try {
    const newUSer = await UserModel.create(req.body);
    return res.json(newUSer);
  } catch (err) {
    const errorMsg = Object.values(err.errors).map((val) => val.message);
    res.status(500).json(errorMsg);
  }
};

//Method to login user
module.exports.loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(403).json({ msg: "Credenciales inválidas" });
    } else {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        const newJWT = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        return res
          .cookie("usertoken", newJWT, process.env.SECRET_KEY, {
            httpOnly: true,
          })
          .json({ fullName: user.fullName, _id: user._id });
      } else {
        res.status(403).json({ msg: "Credenciales inválidas" });
      }
    }
  } catch (err) {
    res.status(403).json({ msg: "Credenciales inválidas", err });
  }
};

module.exports.greeting = async (_, res) => {
  try {
    res.json({ msg: "Están validados :-)" });
  } catch (err) {
    return res.status(403).json(err);
  }
};

module.exports.logout = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.clearCookie("usertoken");
      return res.json(user);
    }
  } catch (err) {
    return res.status(500).json({ msg: "Ha fallado", err });
  }
};
