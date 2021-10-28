const UserModel = require("../models/user.model");

//Method to create an user
module.exports.createUser = async (req, res) => {
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
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      // console.log("PASSWORD DE LA BASE DE DATOS: ", user.password);
      // console.log("PASSWORD DESDE EL FRONTEND:", req.body.password);
      if (user.password === req.body.password) {
        return res.json({ fullName: user.fullName, _id: user._id });
      } else {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    })
    .catch((err) => res.status(400).json(err));
};
