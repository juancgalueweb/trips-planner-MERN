const {
  createTrip,
  getTripByUser,
  getTripById,
  deleteTripById,
  updateTripById,
} = require("../controllers/trips.controllers");

module.exports = (app) => {
  app.post("/api/trip/create", createTrip);
  app.get("/api/trips/:id", getTripByUser);
  app.get("/api/trip/:id", getTripById);
  app.put("/api/trip/:id", updateTripById);
  app.delete("/api/trip/delete/:id", deleteTripById);
};
