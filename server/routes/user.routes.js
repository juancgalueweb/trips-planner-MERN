const { createUser, loginUser } = require("../controllers/user.controllers");

module.exports = (app) => {
  app.post("/api/auth/register", createUser);
  app.post("/api/auth/login", loginUser);
};
