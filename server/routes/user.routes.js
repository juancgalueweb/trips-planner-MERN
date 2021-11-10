const {
  registerUser,
  loginUser,
  greeting,
  logout,
} = require("../controllers/user.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/auth/register", registerUser);
  app.post("/api/auth/login", loginUser);
  app.get("/api/auth/greeting", authenticate, greeting);
  app.post("/api/auth/logout", logout);
};
